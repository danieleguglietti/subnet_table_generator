export interface Net {
	address: string;
	mask: string;
	broadcast: string;
	range: string;
}

enum NetType {
	NULL = -1,
	A = 1,
	B,
	C
}

export default class NetManager {
    /**
     *  The address given by the user.
     */
	private baseAddress: string;

    /**
     *  The amsk given by the user.
     */
	private baseMask: string;

    /**
     *  The amount of subnets the user wants to calculate.
     */
	private netsAmount: number;

    /**
     *  The amount of bits required to make the N subnets.
     */
	private bitsAmount: number;

    /**
     *  The main net's class.
     */
	private netType: NetType = NetType.NULL;

    /**
     * 
     * @param baseAddress The address where start.
     * @param baseMask The mask of the given address.
     * @param netsAmount The amount of subnets thw user wants to calculate.
     */
	constructor(baseAddress: string, baseMask: string, netsAmount: number) {
		this.baseAddress = baseAddress;
		this.baseMask = baseMask;
		this.netsAmount = netsAmount;

		this.bitsAmount = this.getBitAmount();

		this.netType = baseMask.split('.').filter((s) => s === '255').length;
	}

    /**
     *  From the netsAmount (as Nnets) property culculates the amount of bits required to make the Nnets subnets.
     * 
     *  Ex.  Nnets = 3 -> Nbits = 2
     * @param i The recusive index (Default starts at 0).
     * @returns The amount of bits required to make the Nnets subnets.
     */
	private getBitAmount = (i = 0): number =>
		Math.pow(2, i) >= this.netsAmount ? i : this.getBitAmount(i + 1);

	/**
	 *  Creates a template address with placeholders that can be raplced with IDs.
	 *  Placeholders:
	 *  * %s - The first editable byte;
     * 
     *  Ex. 255.255.%s.0
	 *  @returns The formatted mask.
	 */
	private getFormattedMask = (): string =>
		this.baseMask
			.split('.')
			.map((byte, i) => (i === this.netType ? '%s' : byte))
			.join('.');

	/**
	 *  Calculates the value of the last byte of the Subnet Mask.
	 *  @param i The recusive index (Default starts at 0).
	 *  @returns The last byte of the mask.
	 */
	private getMaskByte = (i = 0): number =>
		i === this.bitsAmount ? 0 : Math.pow(2, 7 - i) + this.getMaskByte(i + 1);

	/**
	 *  Creates a template address with placeholders that can be raplced with IDs.
	 *  Placeholders:
	 *  * %s - The first editable byte;
	 *  * %c - The other editable bytes;
	 *
	 *  Ex. 172.16.%s.%c
	 *  @returns A formated address.
	 */
	private getFormattedAddress = (): string =>
		this.baseAddress
			.split('.')
			.map((byte, i) => (i === this.netType ? '%s' : byte))
			.map((byte, i) => (i > this.netType ? '%c' : byte))
			.join('.');

	/**
	 *  Calculates all subnets and return an array of them.
	 *  @returns Array of subnets.
	 */
	public get createSubnets(): Net[] {
		const nets: Net[] = [];
		const mask = this.getFormattedMask().replace('%s', `${this.getMaskByte()}`);

		for (let i = 0; i < Math.pow(2, this.bitsAmount); ++i) {
			const address = this.getFormattedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * i}`)
				.replaceAll('%c', '0');

			const broadcast = this.getFormattedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * (i + 1) - 1}`)
				.replaceAll('%c', '255');

			const firtHost = this.getFormattedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * i + 1}`)
				.replaceAll('%c', '0');

			const lastHost = this.getFormattedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * i + 1}`)
				.replaceAll('%c', '0')
				.split('.')
				.map((_, i) => (i === 3 ? '254' : _))
				.join('.');

			nets.push({ address, mask, broadcast, range: `${firtHost} - ${lastHost}` });
		}

		return nets;
	}
}
