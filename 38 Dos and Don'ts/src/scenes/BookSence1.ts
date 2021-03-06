class BookSence1 extends eui.Component implements  eui.UIComponent {
    private grayTweenGroup:egret.tween.TweenGroup;
	private grayCanvasGroup:eui.Group;

	private dialogGroup:eui.Group;

	private nextGroup:eui.Group;

	private currentSoundChannel:egret.SoundChannel;
	private teacherTouchImg:eui.Image;
	private teacher1Label:eui.Label;
	private teacher2Label:eui.Label;
	private teacherHeadImg:eui.Image;
	private image:eui.Image;
	private Label_true:eui.Label;
	private Label_false:eui.Label;
	private exitLabel:eui.Label;
	private exitImage:eui.Image;
	private exitLogo:eui.Group;
	
	private nextBtnGroup:eui.Group;
	private exitGroup:eui.Group;
	private fram_exitTips:eui.Group;

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
		this.playAnimation();
	}

	private async playAnimation():Promise<void>
	{
       this.grayTweenGroup.play(0);
	   this.currentSoundChannel = (RES.getRes('in_class_room_mp3') as egret.Sound).play(0,1);
	   await ThreadUtility.sleep(3000);
	   this.grayCanvasGroup.visible = false;
	   this.dialogGroup.visible = true;
	   this.classRoomBook();

	   this.exitGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showExitTips,this);
	   this.Label_true.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeCurrentWindow,this);
		this.Label_false.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeExitTipsFrame,this);
		this.exitGroup.addEventListener(mouse.MouseEvent.ROLL_OUT,()=>this.exitImage.alpha=0.3,this);
		this.exitGroup.addEventListener(mouse.MouseEvent.ROLL_OVER,()=>this.exitImage.alpha=1,this);
	}

	private showExitTips():void {
		this.fram_exitTips.visible=true;
	}

	private closeCurrentWindow(){
		window.close();
	}

	private closeExitTipsFrame(){
		this.fram_exitTips.visible=false;
	}

	private async classRoomBook():Promise<void>
	{
	   this.currentSoundChannel = (RES.getRes('put_book_mp3') as egret.Sound).play(0,1);
	   await ThreadUtility.sleep(2000);
	   this.teacherTouchImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextDialog, this);
	   this.teacherTouchImg.addEventListener(mouse.MouseEvent.ROLL_OUT, ()=>this.teacherHeadImg.source='teacher_head_normal_png', this);
	   this.teacherTouchImg.addEventListener(mouse.MouseEvent.ROLL_OVER, ()=>this.teacherHeadImg.source='teacher_head_hover_png', this);		   
	   		   
	}

	private async nextDialog():Promise<void>
	{  
	   this.teacher1Label.text = 'Yes, you can. You can put'
	   this.teacher2Label.text= "away your books now.";
	   
	   
	   this.currentSoundChannel = (RES.getRes('vo_books_mp3') as egret.Sound).play(0,1);
	   await ThreadUtility.sleep(3000);
	   this.nextGroup.visible = true;
	   this.nextBtnGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>Main.instance.gotoScene(new lineUpScene2()), this);
       
	}
	
}