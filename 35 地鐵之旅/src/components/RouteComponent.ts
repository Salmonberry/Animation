class RouteComponent extends eui.Component implements  eui.UIComponent {

	private iconGroup: eui.Group;
	private closeImage: eui.Image;

	private hailongAnimation: egret.tween.TweenGroup;
	private huaguoAnimation: egret.tween.TweenGroup;
	private iconAnimation = {};

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
		this.closeImage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseClick, this)
		this.iconAnimation = {
			'huaguoshan': this.huaguoAnimation,
			'hailong': this.hailongAnimation
		};
		this.setIcon();
	}

	private onCloseClick(): void
	{
		this.visible = false;
	}
	
	private _icon = '';

	public get icon(): string
	{
		return this._icon;
	}

	public set icon(val: string)
	{
		this._icon = val;
	}

	private setIcon(): void
	{
		if(this._icon != '')
		{
			this.iconGroup.$children.map((child) => {
				let image = (child as eui.Image);
				image.name == CurrectJourneyRepository.termiuns && (this.iconAnimation[image.name] as egret.tween.TweenGroup).playLoopAsync();
			})
		}
	}

}