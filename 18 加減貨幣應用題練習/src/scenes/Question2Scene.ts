class Question2Scene extends eui.Component implements eui.UIComponent {

	private questionLabel: eui.Label;
	private titleLabel: eui.Label;
	private expressionLabel: eui.Label;
	private answerLabel: eui.Label;
	private tipLabel: eui.Label;
	private bestImage: eui.Image;
	private scarfImage: eui.Image;
	private handkerchiefImage: eui.Image;


	private Animation: egret.tween.TweenGroup;
	private Beers: egret.tween.TweenGroup;
	private worldsGroup: eui.Group;
	private arithmetic: eui.Group;

	private nextStepButton: ui.nextStepButton;
	private previousQuestionButton: PreviousQuestion;
	private nextQuestionButton: Ui.NextQuestion;
	private numberPad: NumberPad;
	private ant: Ui.MovieClipPlayer;
	private Beer: Beer;

	private expression = '';//用户输入的模式
	private inputssion = '';//答案输入的模式

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.playBackMusic();
		this.DisplayAnimation();

		this.nextQuestionButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextQuestionPage, this);
		this.previousQuestionButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.previousQuestion, this);
		this.numberPad.addEventListener(KeyDownEvent.EVENT, this.numberPadButtonClick, this);
		this.nextStepButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextStep, this);
	}

	// 下一步
	private nextStep(): void {

	}

	//数字按钮事件
	private numberPadButtonClick(e: KeyDownEvent): void {
		if (e.char == '' && this.expression.length > 0) {
			this.expression = this.expression.substr(0, this.expression.length - 1);
		} else {
			this.expression += e.char;
		}
		this.expressionLabel.text = this.expression;
	}


	// 出场动画
	private async DisplayAnimation(): Promise<void> {
		await lzlib.ThreadUtility.sleep(500);
		this.questionLabel.visible = true;
		this.Animation.play(0);
	}

	// BGM
	private async playBackMusic(): Promise<void> {
		await lzlib.SoundUtility.playSound("scene02_mp3");
		this.titleLabel.visible = true;
		lzlib.ThreadUtility.sleep(1000);
		await lzlib.SoundUtility.playSound("think_mp3");
		await this.Beers.play(0);
		setTimeout(() => { this.worldsGroup.visible = true; }, 1000);
		await lzlib.ThreadUtility.sleep(3000);
		this.nextStepButton.visible = true;
		this.expressionLabel.visible = true;
	}

	//下一题
	private onNextQuestionPage(): void {
		Base.gotoNextScene(new Question3Scene());
	}

	//上一题
	private previousQuestion(): void {
		Base.gotoNextScene(new Question1Scene());
	}

	// 下一步
	private verification(): void {
		const verification = this.expression,
			inputssion = "35元4角+14元2角"
		if (verification == inputssion) {
			this.scarfImage.visible = false;
			this.handkerchiefImage.visible = false;
			this.nextStepButton.visible = false;
			this.Beer.visible = false;
			this.worldsGroup.visible = false;
			lzlib.SoundUtility.playSound("retry_mp3").then(() => {
				this.ant.play();
				lzlib.SoundUtility.playSound("retry_mp3");
			}).then(() => {
				this.bestImage.visible = false;
			}).then(() => {
				this.arithmetic.visible = true;
			});
			this.answerLabel.visible = true;
			this.bestImage.visible = true;
		}
		else {
			this.worldsGroup.visible == false && (this.worldsGroup.visible = true);
			this.tipLabel.text = "想清楚，再試一次！";
			lzlib.SoundUtility.playSound("retry_mp3").then(() => {
				this.worldsGroup.visible = false
			});
		}
	}

}