class Scene24 extends eui.Component implements  eui.UIComponent {
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
		Base.onPlayBlackgroundMusic('55_mp3');
	}
	
}