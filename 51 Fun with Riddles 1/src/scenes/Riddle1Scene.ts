class Riddle1Scene extends eui.Component implements eui.UIComponent {
  private botton: eui.Image;
  private pencilBox: eui.Image;
  private schoolBag: eui.Image;
  public isTrueImage: eui.Image;
  private transparentBlock: eui.Rect;

  private keepClickGroup: eui.Group;
  private tipsGroup: eui.Group;
  private drinksTipsGroup: eui.Group;
  private pencilBoxTipGroup: eui.Group;
  private goodsGroup: eui.Group;

  public constructor() {
    super();
  }

  protected partAdded(partName: string, instance: any): void {
    super.partAdded(partName, instance);
  }

  protected childrenCreated(): void {
    super.childrenCreated();

    this.addshowTipsLabel(this.keepClickGroup, this.tipsGroup);
    this.addshowTipsLabel(this.botton, this.drinksTipsGroup);
    this.addshowTipsLabel(this.pencilBox, this.pencilBoxTipGroup);
    this.isTrue(this.schoolBag, this.isTrueImage);
  }

  public addshowTipsLabel(
    object: eui.Group | eui.Image | eui.Button,
    object2: eui.Group | eui.Image | eui.Button
  ): void {
    object.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      () => {
        this.showTipsLabel(object2);
      },
      this
    );
  }

  public async showTipsLabel(
    object: eui.Group | eui.Image | eui.Button
  ): Promise<void> {
    object.visible = true;
    this.preventClick(
      this.drinksTipsGroup,
      this.pencilBoxTipGroup,
      this.isTrueImage,
      this.goodsGroup,
      this.transparentBlock
    );
    await lzlib.ThreadUtility.sleep(5000);
    object.visible = false;
  }

  public isTrue(btn: eui.Image | eui.Button, object: eui.Image) {
    btn.addEventListener(
      egret.TouchEvent.TOUCH_TAP,
      () => {
        this.isvisible(object, this.resultCallback);
      },
      this
    );
  }

  public async isvisible(object: eui.Image, callback): Promise<void> {
    object.visible = true;
    await lzlib.ThreadUtility.sleep(1000);
    await callback();
    // object.visible && this.gotoNextScene(new StatueScene());
    await object.visible && this.parent.removeChild(this);
  }

  public async resultCallback(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      // if (this.isTrueImage.visible)
        resolve(true);
    })
  }

  public gotoNextScene(scene: eui.Component) {
    Main.instance.gotoScene(scene);
  }

  private preventClick(
    tips01Group: eui.Group,
    tips02Group: eui.Group,
    tips03: eui.Image,
    optionGroup: eui.Group,
    transparentBlock: eui.Rect
  ): void {
    if (tips01Group.visible || tips02Group.visible || tips03.visible) {
      const originIndex = optionGroup.getChildIndex(transparentBlock);
      const currentIndex = optionGroup.$children.length - 1;
      optionGroup.setChildIndex(transparentBlock, currentIndex);
      setTimeout(() => {
        optionGroup.setChildIndex(transparentBlock, originIndex);
      }, 5000);
    }
  }
}