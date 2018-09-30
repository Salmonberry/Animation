class RadioComponent extends eui.Component implements  eui.UIComponent {
	
	private radioImage: eui.Image;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		mouse.enable(this.stage);
		mouse.setButtonMode(this.radioImage,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	private _isSelect = false;

	private onTouchTap(e: egret.TouchEvent): void
	{
		this.currentState = 'selected';
		this._isSelect = true;
	}

	private onTouchEnd(e: egret.TouchEvent): void
	{
		this.currentState = 'normal';
		this._isSelect = false;
	}

	public get isSelect(): boolean
	{
		return this._isSelect;
	}
	
	public set isSelect(isselect: boolean)
	{
		this._isSelect = isselect;
		this._isSelect ? this.currentState = 'selected' : this.currentState = 'normal';
	}

	private _value = '';

	public get value(): string
	{
		return this._value;
	}

	public set value(val: string)
	{
		this._value = val;
	}
}