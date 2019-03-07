class StartSceneMask extends eui.Component implements  eui.UIComponent {
	private startButton:eui.Image;
	private playTweenGroup:egret.tween.TweenGroup;
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
		this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartButton,this)
	}

	private async onStartButton(): Promise<void> {
		//由於ios的限制，音頻的播放必須要在交互后才能播放（這個交互，必須帶有資源播放，才能帶動後面的資源的調用播放）
		var SoundChannel:egret.SoundChannel= (RES.getRes("amy_go_shcool_mp3") as egret.Sound).play(0);
		SoundChannel.volume=0;
		this.playTweenGroup.play(0);
		this.startButton.visible = false;
		Main.instance.gotoScene(new StartScene());
	}
	
}