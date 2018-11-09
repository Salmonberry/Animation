class DragPresenter {

	private currectIndex = 0;//表示当前拖拽正确的数目； droping correct number currect 
	private mixCount = 10;//拖拽完成；drop finish
	private view: DragView;
	private audioRepo = new DragAudioRepository();
	private alertInfoRepo = new AlertInfoRepository();
	private currectRD = new CurrectRD();
	

	public constructor() {
	}

	public loadView(view: DragView): void
	{
		this.view = view;
	}

	public onDrop(e: lzlib.LzDragEvent): void
	{
		let dragImage = (e.dragObject as eui.Image);
		let dragName = dragImage.name
		if(dragName == e.target.$name){
			//拖拽正确 drop correct
			console.log('drop correct');
			this.currectIndex++;
			//显示拖拽正确部分 show part for correct 
			this.view.showCorrectPart(dragName);
			//隐藏右边拖拽完成的部分 hide correct part in right
			this.view.hideDrapPart(dragImage);
			//弹出信息 alert info
			let decorationInfo = this.alertInfoRepo.getInfo(dragName);
			decorationInfo.playMP3();
			this.view.alertCorrectInfo(decorationInfo.alertInfo);
			this.currectIndex == this.mixCount && this.dropFinish();

		}else{
			//拖拽失败 drop failure
			console.log('drop failure');
			//闪烁拖拽部位的对应文字  flicker text 
			let curRD = this.currectRD.getCurrectRD(dragName);
			this.view.textFlicker(curRD);
			//弹出信息 alert info
			this.view.alertWrongtInfo(this.currectRD.getTextRD());
		}
	}
	
	public onMouseOver(e: egret.TouchEvent): void
	{
		let textLabel = e.target as eui.Label;
		let name = e.target.$name;
		textLabel.textColor = 0x2353E0;
		this.audioRepo.playMP3(name);
		this.view.showOverText(name);
	}

	public onMouseOut(e: egret.TouchEvent): void
	{
		let textLabel = e.target as eui.Label;
		textLabel.textColor = 0x266232;
		this.audioRepo.stopMP3();
		this.view.hideOverText();
	}

	private dropFinish(): void
	{
		this.view.playFinishAnimation();
		this.view.playFinishMP3();
	}
}