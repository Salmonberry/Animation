class StartScene extends eui.Component implements  eui.UIComponent {
	private splashTweenGroup: egret.tween.TweenGroup;

	private currentSoundChannel: egret.SoundChannel;

	private startButton2: eui.Image;
	private startMask: eui.Rect;

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
		this.startButton2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartButton2Click, this);
	}

	private onStartButton2Click(): void
	{
		this.startMask.visible = false;
		this.startButton2.visible = false;
		this.playSplashMovie();
	}

	private async playSplashMovie(): Promise<void>
	{
		await this.splashTweenGroup.playOnceAsync();
		await lzlib.ThreadUtility.sleep(2000);
		Main.instance.gotoScene(new CalculationScene());
	}
}