interface IParticleComponent extends eui.UIComponent {
	digit: number;
	color: string;
	/** 把当前数粒移动到目标数粒旁边 */
	moveTo(destination: IParticleComponent): Promise<void>;
	/** 合并被加数 */
	mergeAddend(addend: IParticleComponent): Promise<void>;
	/** 合并进位 */
	mergeCarry(carry: IParticleComponent): Promise<void>;
	/** 减少数字 */
	reduce(value: number): void;
	/** 复制指定数量的children */
	getChildren(count: number): IParticleComponent[];
	/** 复制颜色 */
	copyColor(source: IParticleComponent[], destIndex: number): void;
	/** 借位 */
	borrowOne(): IParticleComponent;
	/** 移动到目标的左边 */
	moveToLeftOf(target: IParticleComponent): Promise<void>;
	/** 移动到目标的右边 */
	moveToRightOf(target: IParticleComponent): Promise<void>;
	/** 变成半透明 */
	translucent(): void;
}