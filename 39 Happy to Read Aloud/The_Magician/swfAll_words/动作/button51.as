﻿// Action script...

on (rollOver)
{
    clock = new Sound();
    clock.attachSound("block");
    clock.start();
}

on (rollOut)
{
    clock.stop();
}
