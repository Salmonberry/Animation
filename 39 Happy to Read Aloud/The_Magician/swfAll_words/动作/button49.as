﻿// Action script...

on (rollOver)
{
    clock = new Sound();
    clock.attachSound("cock");
    clock.start();
}

on (rollOut)
{
    clock.stop();
}
