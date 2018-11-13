class Question5Scene extends eui.Component implements eui.UIComponent {
	private motion_milk1: egret.tween.TweenGroup;
	private image7: eui.Image;
	private image8: eui.Image;
	private image9: eui.Image;
	private image10: eui.Image;
	private image11: eui.Image;
	private exitButton: ImageButton;
	private nextButton: ImageButton;
	private examplesButton: ImageButton;
	private lastButton: ImageButton;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		mouse.enable(this.stage);
		this.exitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitButtonClick, this);
		this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextButtonClick, this);
		this.examplesButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExamplesButtonClick, this)
		this.lastButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLastButtonClick, this)
		this.playGame();
	}
	// 结束事件
	private onExitButtonClick(): void {
		window.close();
	}
	// 下一题按钮时间
	private onNextButtonClick(): void {
		Main.instance.gotoScene(new Question6Scene());
	}
	// 列式计算按钮事件
	private onExamplesButtonClick(): void {
		this.playExamples();
	}
	// 上一题按钮事件
	private onLastButtonClick(): void {
		Main.instance.gotoScene(new Question4Scene());
	}

	private async playGame(): Promise<void> {
<<<<<<< HEAD
		await lzlib.SoundUtility.playSound('add_5streamsound 0_mp3');
		this.motion_milk1.play(0);
		await lzlib.SoundUtility.playSound('add_5streamsound 1_mp3');
		this.image7.visible = true;
		await lzlib.SoundUtility.playSound('add_5streamsound 2_mp3');
		this.examplesButton.visible = true;
=======
		this.motion_milk1.play(0);
		await lzlib.SoundUtility.playSound('add_5streamsound_0_mp3');
		await lzlib.SoundUtility.playSound('add_5streamsound_1_mp3');
		await lzlib.SoundUtility.playSound('add_5streamsound_2_mp3');
		await lzlib.SoundUtility.playSound('add_5streamsound_3_mp3');
		this.examplesButton.visible = true;


>>>>>>> 9-加法應用題
	}

	private async playExamples(): Promise<void> {
		this.examplesButton.visible = false;
<<<<<<< HEAD
		await lzlib.SoundUtility.playSound('add_5streamsound 3_mp3');
		this.image8.visible = true;
		this.image9.visible = true;
		await lzlib.SoundUtility.playSound('add_5streamsound 4_mp3');
		this.image10.visible = true;
		await lzlib.SoundUtility.playSound('add_5streamsound 5_mp3');
		this.image11.visible = true;
		await lzlib.SoundUtility.playSound('add_5streamsound 6_mp3');
=======
		this.motion_milk2.play(0);
		await lzlib.SoundUtility.playSound('add_5streamsound_4_mp3');
		await lzlib.SoundUtility.playSound('add_5streamsound_5_mp3');
		await lzlib.SoundUtility.playSound('add_5streamsound_6_mp3');
>>>>>>> 9-加法應用題
	}
}