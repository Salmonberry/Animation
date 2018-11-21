interface MotorCarView {
	playStartIntroduction(): Promise<void>;
    playGapMP3(): Promise<void>;
    openRightDoor(): Promise<void>;
    closeRightDoor(): Promise<void>;
    openLeftDoor(): Promise<void>;
    closeLeftDoor(): Promise<void>;
}