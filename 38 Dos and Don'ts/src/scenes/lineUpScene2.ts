class lineUpScene2 extends eui.Component implements  eui.UIComponent {
	private teacherTouchImg:eui.Image;
	private teacherUnhappyImg:eui.Image;

	private currentSoundChannl:egret.SoundChannel;

	private exitGroup:eui.Group;
	private forkIconImg:eui.Image;

	private nextGroup:eui.Group;
	private nextLabel:eui.Label;
	private nextBtnGroup:eui.Group;

    private teacherDialogGroup:eui.Group;
	private firstLabel:eui.Label;
	private secondLabel:eui.Label;

	
	
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
		mouse.setButtonMode(this.exitGroup, true);
		mouse.setButtonMode(this.nextBtnGroup, true);
		
        this.playSound();
		this.exitGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>window.close(), this);
		this.exitGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, ()=>this.forkIconImg.alpha = 0.3, this);
		this.exitGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, ()=>this.forkIconImg.alpha = 1, this);
		
	}

	private async playSound():Promise<void>
	{
        this.currentSoundChannl = (RES.getRes('can_they_play_here_mp3') as egret.Sound).play(0,1);
		await ThreadUtility.sleep(1000);	
		this.teacherDialogGroup.visible = true;
		this.teacherUnhappyImg.visible = true;
		this.teacherTouchImg.visible = true;
		this.initTeacherTouchEvent();
	}

	private  initTeacherTouchEvent():void
	{
		this.teacherTouchImg.addEventListener(mouse.MouseEvent.ROLL_OUT, this.mouseOut, this);
		this.teacherTouchImg.addEventListener(mouse.MouseEvent.ROLL_OVER, this.mouseOver, this);
		this.teacherTouchImg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.teacherTouchImg.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.teacherTouchImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextDialog, this);
	}

	private async nextDialog():Promise<void>
	{   
		this.currentSoundChannl.stop();		
        this.currentSoundChannl = (RES.getRes('line_up_mp3') as egret.Sound).play(0,1);
		this.firstLabel.text = "No,they can't.";
		this.secondLabel.text = "They must line up now.";	
		await ThreadUtility.sleep(3500);
        this.nextGroup.visible = true;
		
		this.nextBtnGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, ()=>this.nextLabel.textColor = 0, this);
		this.nextBtnGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, ()=>this.nextLabel.textColor = 16766720, this);
		this.nextBtnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>Main.instance.gotoScene(new TalkScene3()), this);
        
	}

	private mouseOut():void
	{
		this.teacherUnhappyImg.source = 'teacher_head_unhappy_png';
	    this.teacherTouchImg.source = 'blue_circle_png';
	}

	private mouseOver():void
	{
		this.teacherUnhappyImg.source = 'teacher_head_bb_png';
	    this.teacherTouchImg.source = 'green_circle_png';
	}

	private touchBegin():void
	{
		this.teacherUnhappyImg.source = 'teacher_head_bb_png';
		this.teacherUnhappyImg.skewX = 1.2;
		this.teacherUnhappyImg.skewY = 1.2;
	    this.teacherTouchImg.source = 'blue_circle_png';
	}

	private touchEnd():void
	{
		this.teacherUnhappyImg.source = 'teacher_head_bb_png';
	    this.teacherTouchImg.source = 'green_circle_png';
		this.teacherUnhappyImg.skewX = 1;
		this.teacherUnhappyImg.skewY = 1;
	}

	private stopSoundChannel():void
	{
		if( this.currentSoundChannl != null){
			this.currentSoundChannl.stop();
		}
	}

	
	
}