class Question1Scene extends eui.Component implements  eui.UIComponent {
	private appNameLabel: eui.Image;
	private topAnswerCheckbox: eui.CheckBox;
	private bottomAnswerCheckbox: eui.CheckBox;
	private topSpeakerButton: ImageButton;
	private bottomSpeakerButton: ImageButton;
	private nextSceneButton: ImageButton;
	private exitButton: eui.Image;
	private exit:eui.Image;

	private topSpeakerButtonPlayed = false; //用户是否已经播放顶部答案
	private bottomSpeakerButtonPlayed = false; //用户是否已经播放底部答案

	private isCompleted = false;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated(): void
	{
		super.childrenCreated();
		this.topSpeakerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTopSpeakerButtonClick, this);
		this.bottomSpeakerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBottomSpeakerButtonClick, this);
		this.topAnswerCheckbox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTopAnswerCheckboxClick, this);
		this.bottomAnswerCheckbox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBottomAnswerCheckboxClick, this);
		this.nextSceneButton.once(egret.TouchEvent.TOUCH_TAP, this.onNextPageButtonClick, this);
		this.exitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitButtonClick, this);
		this.exitButton.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this)
		this.exitButton.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this)
		
		this.playGame();
	}
	
	private onRollOver():void {
		this.exit.visible = true;
		this.exitButton.scaleX = this.exitButton.scaleY = 1.1;
	}

	private onRollOut(): void{
		this.exit.visible = false;
		this.exitButton.scaleX = this.exitButton.scaleY = 1;
	}

	private async playGame(): Promise<void>
	{
		await lzlib.SoundUtility.playSound('encounter_snake_mp3');
		this.appNameLabel.parent.removeChild(this.appNameLabel);

		await lzlib.SoundUtility.playSound('fangfang_and_her_dad_encounter_a_snake_when_they_are_walking_someday_mp3');
		this.topSpeakerButton.enabled = true;
		this.bottomSpeakerButton.enabled = true;
	}

	private onTopSpeakerButtonClick(e: egret.TouchEvent): void
	{
		lzlib.SoundUtility.playSound('wa_a_snake_mp3');
		this.topSpeakerButtonPlayed = true
		this.confirmBothSpeakersArePlayed()
	}

	private onBottomSpeakerButtonClick(e: egret.TouchEvent): void
	{
		lzlib.SoundUtility.playSound('yi_a_snake_here_mp3');
		this.bottomSpeakerButtonPlayed = true
		this.confirmBothSpeakersArePlayed()
	}

	private confirmBothSpeakersArePlayed(): void
	{
		this.topAnswerCheckbox.enabled 
		= this.bottomAnswerCheckbox.enabled 
		= !this.isCompleted && this.topSpeakerButtonPlayed && this.bottomSpeakerButtonPlayed;
	}

	private onTopAnswerCheckboxClick(e: egret.TouchEvent): void
	{
		this.bottomAnswerCheckbox.selected = false;
		if (this.topAnswerCheckbox.selected) {
			lzlib.SoundUtility.playSound('you_are_right_and_go_to_next_page_mp3');
		}
		this.topAnswerCheckbox.enabled = false;
		this.bottomAnswerCheckbox.enabled = false;
		this.nextSceneButton.enabled = true;
		this.isCompleted = true;
	}

	private onBottomAnswerCheckboxClick(e: egret.TouchEvent): void
	{
		this.topAnswerCheckbox.selected = false;
		if (this.bottomAnswerCheckbox.selected) {
			lzlib.SoundUtility.playSound('fangfang_would_not_so_calm_because_she_yell_when_she_see_the_snake_mp3');
		}
	}

	private onNextPageButtonClick(e: egret.TouchEvent): void
	{
		Main.instance.gotoScene(new Question2Scene());
	}

	private onExitButtonClick(e: egret.TouchEvent): void
	{
		window.close();
	}
}