class Question2Scene extends eui.Component implements  eui.UIComponent {

	private runners_motion1: egret.tween.TweenGroup;
	private runners_motion2: egret.tween.TweenGroup;
	private runners_motion3: egret.tween.TweenGroup;


	private exitButton: ImageButton;
	private nextButton: ImageButton;
	private nextStepButton:ImageButton;
	private lastButton: ImageButton;
	private numberPad: NumberPad;
	
	private expressionLabel: eui.Label;
	private textRunnerslmage: eui.Label;
	private honeyBee2image:eui.Image;
	private ejectBox1lmage:eui.Image;
	private reflectionlmage:eui.Image;
	private repeat:eui.Image;
	private googd:eui.Image;
	private Ant1lmage:eui.Image;
	private image10:eui.Image;
	private antBoxImage:eui.Image;
	private repeat2lmage:eui.Image;
	private totalTextlmage:eui.Label;
	private runners_box:eui.Group;
	private number_box:eui.Group;
	private sumGroup: eui.Group;
	private totalBoxlmage:eui.Group;
	private editableLabelGroup: eui.Group;
	private expression = ''; //用户输入的横式
	private inputssion = '' //答案输入模式

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
		this.exitButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitButtonClick,this);
		this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onnNextButtonButtonClick,this);
		this.lastButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onnLstaButtonButtonClick,this);
		this.nextStepButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onnNextstepButtonClick,this);
		this.numberPad.addEventListener(KeyDownEvent.EVENT,this.onnNumberPadButtonClick,this)
		this.playGame();
		this.repeat.visible = false;
		this.totalTextlmage.visible = false;
	}
	// 离开按钮事件
	private onExitButtonClick (): void{
		console.log(123)
	}
	// 下一题按钮事件
	private onnNextButtonButtonClick (): void{
		console.log(123)
	}
	// 上一题按钮事件
	private onnLstaButtonButtonClick (): void{
		
	}
	// 点击下一步事件
	private onnNextstepButtonClick () : void{
		this.playExamples();
	}
	// 点击数字按钮事件
	private onnNumberPadButtonClick (e:KeyDownEvent) : void{
		if (e.char == '' && this.expression.length > 0) {
			this.expression = this.expression.substr(0, this.expression.length - 1);
		} else {
			this.expression += e.char;
		}
		this.expressionLabel.text =  this.expression;

	}
	private async playGame(): Promise<void> {
		this. runners_motion1.play(0);
		this.nextStepButton.visible = false;
		this.expressionLabel.visible = false;
		this.textRunnerslmage.visible = false;
		await lzlib.SoundUtility.playSound("sound1_streamsound 0_mp3")

		this.textRunnerslmage.visible = true;
		this. runners_motion2.play(0);
		await lzlib.SoundUtility.playSound("think_streamsound 0_mp3")
		this.nextStepButton.visible = true;
		this.expressionLabel.visible = true;
	}
	private async playExamples():Promise<void> {
		if(this.expression == "214+123" || this.expression == "123+214"){
			this.totalTextlmage.visible = true;
			this.expressionLabel.visible = false;
			this.honeyBee2image.visible = false;
			this.ejectBox1lmage.visible = false;
			this.reflectionlmage.visible = false;
			this.repeat.visible = false;
			this.runners_box.visible = false;
			this.nextStepButton.visible = false;
			this. runners_motion3.play(0);
			await lzlib.SoundUtility.playSound("add_intro_streamsound 1_mp3")
			await lzlib.SoundUtility.playSound("add_intro_streamsound 0_mp3")
			this.number_box.visible = true;
			this.Ant1lmage.visible = true;
			this.image10.visible = false;
			this.antBoxImage.visible = false;
			this.googd.visible = false;
		
			this.validateSum();
		}else{
			this.reflectionlmage.visible = false;
			this.repeat.visible = true;
			// this.ejectBox1lmage.visible = true;
			await lzlib.SoundUtility.playSound("retry_streamsound 0_mp3")
			// this.repeat.visible = false;
			// this.ejectBox1lmage.visible = false;
		}
	}

	private async validateSum(): Promise<void>
	{
		let correctArray = ['7', '3', '3'];

		for (let index = 0; index < correctArray.length; index++) {
			let correctNumber = correctArray[index];
			let inputedNumber = '';
			let editableLabel = this.editableLabelGroup.getChildAt(index) as EditableLabel;
			editableLabel.visible = true;
			while ((inputedNumber = await this.numberPad.getCharAsync()) != correctNumber) {
				console.log('输入错误');
				this.antBoxImage.visible = true;
				this.repeat2lmage.visible = true;
				await lzlib.SoundUtility.playSound("error_streamsound 0_mp3")
				this.antBoxImage.visible = false;
				this.repeat2lmage.visible = false;
			}
			editableLabel.currentState = 'view';
			editableLabel.text = inputedNumber;
		}

		this.googd.visible = true;
		this.totalBoxlmage.visible = true;
		await lzlib.SoundUtility.playSound("add_intro_streamsound 1_mp3")
	}
}
