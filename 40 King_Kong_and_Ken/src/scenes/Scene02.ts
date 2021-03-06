class Scene02 extends eui.Component implements  eui.UIComponent {
	private nextBtn:eui.Button;
	private diplayTweenGroup:egret.tween.TweenGroup;
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
		this.nextBtn.touchEnabled=true;
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtnClick,this);
		this.playBackgroundMusic();
		this.diplayTweenGroup.play(0);
	}

	private async playBackgroundMusic():Promise<void> {
		await lzlib.SoundUtility.playSound('03_mp3');
		this.nextBtn.visible = true;
	}

	private onNextBtnClick():void {
		Main.instance.gotoScene(new Scene03());
	}
}