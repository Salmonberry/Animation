class GamePresenter {
	private sentenceRepo = new SentenceRepository();
	private conjunctionRepo = new ConjunctionRepository();
	private view: GameView;
	private sentence: Sentence;
	private leftConjuction: Conjunction;
	private rightConjunction: Conjunction;

	public constructor() {
	}

	public loadView(view: GameView): void {
		this.view = view;
		this.sentence = this.sentenceRepo.get(LevelBiz.instance.currentLevel, LevelBiz.instance.currentQuestionIndex);
		this.view.showAllConjunctions(this.conjunctionRepo.getAll());
		if (LevelBiz.instance.currentQuestionIndex == 0) {
			this.view.playAudioHowToPlay();
		}
	}

	public onConjunctionTouchBegin(conjunctionIndex: number): void {
		this.view.blinkConjunctionBackgroundInTrain();
		this.view.playAudio(this.conjunctionRepo.get(conjunctionIndex).audioName);
	}

	public onConjunctionTouchCancel(): void {
		this.view.hideConjunctionBackgroundInTrain();
	}

	public onLeftConjunctionDrop(conjuctionIndex: number): void {
		this.leftConjuction = this.conjunctionRepo.get(conjuctionIndex);
		//this.view.showLeftConjunction(this.leftConjuction.text);
		this.view.disableDropLeftConjunctionInTrain();
		//this.view.hideConjunction(conjuctionIndex);
		this.view.hideConjunctionBackgroundInTrain();
		this.playSentenceWithConjunction();
	}

	public onRightConjunctionDrop(conjuctionIndex: number): void {
		this.rightConjunction = this.conjunctionRepo.get(conjuctionIndex);
		//this.view.showRightConjunction(this.rightConjunction.text);
		this.view.disableDropRightConjunctionInTrain();
		//this.view.hideConjunction(conjuctionIndex);
		this.view.hideConjunctionBackgroundInTrain();
		this.playSentenceWithConjunction();
	}

	private async playSentenceWithConjunction(): Promise<void> {
		if (this.leftConjuction != null && this.rightConjunction != null) {
			await this.view.playAudioYourSentenceIsAsync();
			await this.view.playAudio(this.leftConjuction.audioName);
			await this.view.playAudio(this.sentence.clauses[0].audioName);
			await this.view.playAudio(this.rightConjunction.audioName);
			await this.view.playAudio(this.sentence.clauses[1].audioName);
			await this.view.playAudioYouCanPressValidationButton();
			this.view.enableValidationButton();
		}
	}

	public async onValidationButtonClick(): Promise<void> {
		this.view.disableValidationButton();
		if (this.sentence.validate(this.leftConjuction, this.rightConjunction)) {
			this.view.playAudioYouAreCorrect();
			this.view.enableNextButton();
			this.view.playMovieTrainGo();
		} else {
			this.view.showAllConjunctions(this.conjunctionRepo.getAll());
			this.leftConjuction = this.rightConjunction = null;
			this.view.clearConjunctionsInTrain();
			this.view.hideConjunctionsInTrain();
			this.view.enableDropLeftConjunctionInTrain();
			this.view.enableDropRightConjunctionInTrain();
			await this.view.playAudioYouAreWrongAsync();
			this.view.playAudio(this.sentence.tipsAudioName);
		}
	}

	public async onNextButtonClick(): Promise<void> {
		LevelBiz.instance.currentQuestionIndex++;
		if (this.sentenceRepo.get(LevelBiz.instance.currentLevel, LevelBiz.instance.currentQuestionIndex) == null) {
			this.view.showCurrentLevelFinished();
			await lzlib.ThreadUtility.sleep(1500);
			LevelBiz.instance.currentLevel++;
			LevelBiz.instance.currentQuestionIndex = 0;
			this.view.openBackgroundScene();
		} else {
			this.view.openGameScene();
		}
	}

	public onLeftGirlImageClick(): void {
		this.view.playAudio(this.sentence.clauses[0].audioName);
	}

	public onRightGirlImageClick(): void {
		this.view.playAudio(this.sentence.clauses[1].audioName);
	}
}