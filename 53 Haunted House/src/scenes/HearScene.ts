class HearScene extends eui.Component implements eui.UIComponent{

    
    private nextSceneButton:eui.Image
    private girlSad:eui.Image
    private whisper:eui.Image
    private door:eui.Image
    private scrollText:eui.Label
    private hearTalkBgmChannel:egret.SoundChannel
    private hearCryBgmChannel:egret.SoundChannel
    private hearDoorOpenChannel:egret.SoundChannel

    public constructor(){
        super();
    }
    protected childrenCreated():void
    {   
        super.childrenCreated();
        mouse.enable(this.stage);
        mouse.setButtonMode(this.nextSceneButton, true);
        this.nextSceneButton.addEventListener(mouse.MouseEvent.ROLL_OUT, ()=>this.nextSceneButton.source='button_png', this);
        this.nextSceneButton.addEventListener(mouse.MouseEvent.ROLL_OVER, ()=>this.nextSceneButton.source='hover_button_png', this);
        this.girlSad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hearCry, this);
        this.whisper.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hearTalk, this);  
        this.door.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hearDoorOpen, this);     
    }
    
    private hearCry():void{
         this.scrollText.text = ' a girl crying.';
         this.switchFont();
         this.hearCryBgmChannel = RES.getRes('hear_cry_mp3').play(0,1);
         this.nextScene(); 
    }

    private hearTalk():void{
         this.scrollText.text = ' people talking.';
         this.switchFont();
         this.hearTalkBgmChannel = RES.getRes('hear_talk_mp3').play(0,1);
         this.nextScene(); 
    }

    private hearDoorOpen():void{
         this.scrollText.text=' the door open.';
         this.switchFont();
         this.hearTalkBgmChannel = RES.getRes('hear_door_open_mp3').play(0,1);
         this.nextScene();  
    }

    private  switchFont():void{
        this.scrollText.fontFamily = 'La-Bamba-LET';
        this.scrollText.textColor = 9765173;
        this.scrollText.size = 74.5;
    }

    private nextScene():void{
        this.nextSceneButton.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>Main.instance.gotoScene(new SmellScene), this);
    }
}