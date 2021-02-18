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
	private baseAddress: string;
	private baseMask: string;
	private netsAmount: number;
	private bitsAmount: number;

	private netType: NetType = NetType.NULL;

	constructor(baseAddress: string, baseMask: string, netsAmount: number) {
		this.baseAddress = baseAddress;
		this.baseMask = baseMask;
		this.netsAmount = netsAmount;

		this.bitsAmount = this.getBitAmount();

		this.netType = baseMask.split('.').filter((s) => s === '255').length;
	}

	private getBitAmount = (i = 0): number =>
		Math.pow(2, i) >= this.netsAmount ? i : this.getBitAmount(i + 1);

	private getFormatedMask = (): string =>
		this.baseMask
			.split('.')
			.map((byte, i) => (i === this.netType ? '%s' : byte))
			.join('.');

	private getMaskByte = (i = 0): number =>
		i === this.bitsAmount ? 0 : Math.pow(2, 7 - i) + this.getMaskByte(i + 1);

	private getFormatedAddress = (): string =>
		this.baseAddress
			.split('.')
			.map((byte, i) => (i === this.netType ? '%s' : byte))
			.map((byte, i) => (i > this.netType ? '%c' : byte))
			.join('.');

	public get createSubnets(): Net[] {
		const nets: Net[] = [];
		const mask = this.getFormatedMask().replace('%s', `${this.getMaskByte()}`);

		for (let i = 0; i < Math.pow(2, this.bitsAmount); ++i) {
			const address = this.getFormatedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * i}`)
				.replaceAll('%c', '0');
			const broadcast = this.getFormatedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * (i + 1) - 1}`)
				.replaceAll('%c', '255');
			const range = `${this.getFormatedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * i + 1}`)
				.replaceAll('%c', '0')} - ${this.getFormatedAddress()
				.replace('%s', `${Math.pow(2, 8 - this.bitsAmount) * (i + 1) - 2}`)
				.replaceAll('%c', '255')}`;

			nets.push({ address, mask, broadcast, range });
		}

		return nets;
	}

	public toString() {
		return `NET(${this.baseAddress}, ${this.baseMask}):${this.netType} (${this.bitsAmount})`;
	}
}
