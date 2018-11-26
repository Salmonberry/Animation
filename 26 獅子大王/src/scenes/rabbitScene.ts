class rabbitScene extends eui.Component implements eui.UIComponent {
  private plantMask: egret.tween.TweenGroup;
  private tailWiggle: egret.tween.TweenGroup;
  private invitationCard: egret.tween.TweenGroup;
  private lionDialog: egret.tween.TweenGroup;
  private rabbitDialogBox: egret.tween.TweenGroup;
  private bubleGrad: egret.tween.TweenGroup;
  private changCard: egret.tween.TweenGroup;
  private tipsComponent: tipsComponent;
  private achieveComponent: achieveComponent

  private bulbGroup: eui.Group;
  private achieveGroup: eui.Group;
  private lionDialogGroup: eui.Group;
  private rabbitDialogGroup: eui.Group;

  private tipsBulbComponent: bulbComponent;
  private bulbComponent: bulbComponent;
  private resultAchieveComponent: achieveComponent;

  private circleRect: eui.Rect;

  private lion: eui.Image;

  private optionsScene: optionsScene;
  public constructor(/*optionsScene:optionsScene*/) {
    super();
    // this.optionsScene=optionsScene;
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();

    this.playAnim();
    
    this.bulbGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tips, this);
    this.bulbGroup.addEventListener(mouse.MouseEvent.ROLL_OUT, () => {
      this.bulbComponent.currentState = this.bulbComponent.skin.states[0].name;
    }, this);
    this.bulbGroup.addEventListener(mouse.MouseEvent.ROLL_OVER, () => {
      this.bulbComponent.currentState = this.bulbComponent.skin.states[1].name;
    }, this);
    this.achieveGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.result, this);
  }

  private async playAnim(): Promise<void> {
    this.plantMask.play(0);
    this.tailWiggle.play(0);
    await lzlib.ThreadUtility.sleep(2500);
    await this.invitationCard.playOnceAsync().then(() => {
      this.lionDialog.playOnceAsync();
    });
    await lzlib.ThreadUtility.sleep(2000);
    this.lionDialogText(lionDialogText.rabbitText_a);
    this.playVoice(lionDialogVoice.lionVoice_a).then(() => {
      return new Promise((resolve) => {
        this.rabbitDialogBox.play();
        this.rabbitDialogBox.once(egret.Event.COMPLETE, resolve, this);
      }).then(() => {
        (this.rabbitDialogGroup.$children[3] as eui.Group).visible = true;
        this.playVoice(animalDialogVoice.rabbitVoice_a);
        setTimeout(() => {
          this.circleRect.visible = true;
        }, 4000)
      })
    })

    await lzlib.ThreadUtility.sleep(18000).then(() => {
      this.lion.source = "lione_Silly_png";
      this.lionDialogText(lionDialogText.rabbitText_b);
    });

    await this.playVoice(lionDialogVoice.lionVoice_b).then(() => {
      this.lionDialogText(lionDialogText.rabbitText_c);
      this.playVoice(lionDialogVoice.lionVoice_c);
      this.circleRect.visible = false;
    });
    await this.changCard.playOnceAsync();
    await lzlib.ThreadUtility.sleep(5000);
    (this.rabbitDialogGroup.$children[3] as eui.Group).visible = false;
    (this.rabbitDialogGroup.$children[4] as eui.Group).visible = true;
    await this.playVoice(animalDialogVoice.rabbitVoice_b);
    egret.Tween.get(this.lionDialogGroup).to({ alpha: 0 }, 1000).call(() => {
      egret.Tween.get(this.bulbGroup).to({ alpha: 1 }, 1000);
      egret.Tween.get(this.achieveGroup).to({ alpha: 1 }, 1000);
    });
  }

  //lion動態文本
  private lionDialogText(text: lionDialogText): void {
    let lionLabel = this.lionDialogGroup.$children[2] as eui.Label;
    lionLabel.text = text.toString();
    //   lionLabel.textFlow = [
    //    {text:"hello",style:{size:60,textColor:0x000000}},
    //  {text:"hello",style:{size:60,textColor:0xffff00}}
    //   ]
    // console.log(text);
  }

  //語音播放
  private async playVoice(voice: lionDialogVoice | animalDialogVoice): Promise<void> {
    // let sound: egret.Sound = RES.getRes(voice.toString());
    // sound.play(0, 1);
    let sound = lzlib.SoundUtility.playSound(voice.toString())
    return sound;
  }

  private tips(): void {
    this.bulbComponent.currentState = this.bulbComponent.skin.states[2].name;
    this.tipsComponent = new tipsComponent(this,tipsVoices.rabbitTip.toString());
    this.tipsComponent.currentState="rabbit";
    this.addChild(this.tipsComponent);
    this.tipsComponent.playAnim();
  }

  private result(): void {
    this.achieveComponent = new achieveComponent(this.optionsScene, this);
    // if(){

    // }
    // else{
    //   this.rabbitDialogGroup.$children[4].visible=false
    //   this.rabbitDialogGroup.$children[5].visible=true;
    //   setTimeout(()=>{
    //     this.rabbitDialogGroup.$children[5].visible=false;
    //     this.rabbitDialogGroup.$children[4].visible=true;
    //   },5000)
    // }
  }
}
