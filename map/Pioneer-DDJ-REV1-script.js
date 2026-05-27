

/*
    Pioneer-DDJ-REV1 mapping script file - Pioneer-DDJ-REV1-script.js, 
    Pioneer DDJ-REV1.midi.xml, adapted by AKOI for mixxx.

    GPL license notice for current version:
    This program is free software; you can redistribute it and/or modify it under the terms of the
    GNU General Public License as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
    the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program; if
    not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


    MIT License for earlier versions:
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software
    and associated documentation files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use, copy, modify, merge, publish,
    distribute, sub-license, and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or
    substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// @ts-nocheck
if (typeof include === "function") {
    include("controllers/components.js");
} else if (typeof script !== "undefined" && typeof script.include === "function") {
    script.include("controllers/components.js");
}

// ****************************************************************************
// * Authors: AKOI, Alexandr, LauraRozier, mjlyon, 0b1 
// * Reviewers: ronso, martinprad0
// * Manual: https://www.pioneerdj.com/en/support/documents/ddj-rev1/
// * Forum: https://mixxx.discourse.group/t/pioneer-ddj-rev1-mapping-update-2-6/32603
// * MIDI: https://www.pioneerdj.com/-/media/pioneerdj/software-info/controller/ddj-rev1/ddj-rev1_midi_message_list_e1.pdf
// * User Guide: https://manual.mixxx.org/2.6/en/hardware/controllers/pioneer_ddj_rev1
// * Mapping Version: AKOI v2.1 mapping for the Pioneer DDJ-REV1
// ****************************************************************************
//
//  Implemented (as per manufacturer's manual):
//      * Mixer Section (Faders, EQ, Filter, Gain, Cue, Selector)
//      * Browsing and loading
//      * Vinyl/CDJ Mode
//      * Jogwheels, Scratching, Bending, Loop adjust
//      * Cycle Temporange
//      * Beat Sync 
//      * Hot Cue Mode 
//      * Auto Loop Mode 
//      * Tracking Mode 
//      * Beat Jump Mode 
//      * Roll Mode 
//      * Trans Mode 
//      * Vu Meter  
//      * Sampler Mode 
//      * Fader Start
// 		* Level/Depth working for FX1/FX2 
//      * Waveform Zoom
//      * FX Lights
//	    - Scratch Bank (Replaced with STEMS)(**MIXXX_2.6**)
//      - Scractch Bank (Custom Config True)
//
//  Custom (Mixxx specific mappings):
//      *Vinyl Mode: 
//                 - Starts in Vinyl mode. User configurable
//      * Sampler Mode(Pads 1-4): 
//	                  -Play/Pause
//					  		Pressed(while sample loaded): Play Sample 
//							Pressed(while sample empty): Load currently selected track
//							Pressed+Shift (while sample playing): Stop Sample
//							Pressed+Shift (while sample stopped): Eject Sample
//		* Beat Sync:
//					Sync Pressed: Beat Sync to Master deck
//					Sync Pressed+Shift: Lock Beat Sync ON
//      * Beat jump: 
//				    - Forward & back - Pads 1-2 
//					- Trigger jump size -  Pads 3-4 
//		* Auto Loop: 
//					- Pads 1-8 trigger an autoloop of variable sizes 
//		* Roll: 
//					- Holding pads 1-4 activates a loop roll of varying sizes. Release the pad to exit the Loop Roll
//		* Rewind: 
//				Play/Pause+SHIFT: Braking. User Customizable.
//		* Effects:
//				-LEVEL/DEPTH knob:
//					Adjusts the parameter of the enabled effects of FX1/FX2
//				-SHIFT+FX1: 
//					Cycle to the next EffectChain preset after the currently loaded preset. (Descending) 
//				-SHIFT+FX2: 
//					Adjust the average BPM up by +0.01 - The beatgrid lines move closer to each other
//				-SHIFT+FX3: 
//					Adjust the average BPM down by -0.01 - The beatgrid lines move further apart from each other
//              -FX{N}_{N} + Rotary Selector:
//                  Designate effect for selected FX button. (Descending) 
//          
//		* CUE HEADPHONES: 
//      				-Toggle quantize:
//							Press Once:  CUE Headphones+SHIFT
//						-BPM Adjust:
//							Repeatedly Press: CUE Headphones+SHIFT - press - Adjust BPM to match tapped BPM 
//      * CrossFader Start: 
//                      - Shift + Crossfader: All the way left or right. See manual
//                      - To disable: Utilities Mode Pad 3 is lit: Fader Start is turned off
//                      - Limitation: - Playing deck is always opposite of starting deck irrespective of active opposite deck
//                                    - Controller only sends 0x52 despite Utilities mode settings Sync(0x51) and Non-Sync(0x66)  
//      * Channel Fader Start:
//                      - Shift + UP or Down of opposite Channel Fader: All the way down or up.  Varies from manual. 
//                      - To disable: Utilities Mode Pad 3 is lit: Fader Start is turned off. (MIXXX RESTART may be required)
//                      - Limitation: - Playing deck is always opposite of starting deck irrespective of active opposite deck
//                                    - Controller only sends 0x52 despite Utilities mode settings Sync(0x51) and Non-Sync(0x66)  
//		* Library Sort: 
//                      - Decks 1-4: Sort by configured library column (see controller preferences):
//                          Press SHIFT + LOAD on that deck
//                          Configure per-deck sort target in XML user options
//		* Bonus:
//				- Fixed Tempo Sliders:
//					Tempo Sliders now aligned with REV1 Deck

//				-Scratch Bank/STEMS (All Decks):
//					Pad 1: STEM VOICE Mute
//					Pad 2: STEM MELODY Mute
//					Pad 3: STEM BASS Mute 
//					Pad 4: STEM DRUM Mute
//				    Pad 5: STEM Voice Effect  
//                  Pad 6: STEM MELODY Effect 
//                  Pad 7: STEM BASS Effect 
//                  Pad 8: STEM DRUM Effect   
//             
//					Pad 1 + SHIFT: AutoDJ
//					Pad 2 + SHIFT: AutoDJ Fade to Next
//					Pad 3 + SHIFT: Toggle Microphone
//					Pad 4 + SHIFT: Record Mix
//					Pad 5 + SHIFT: Key Match 
//					Pad 6 + SHIFT: Beat Grid
//					Pad 7 + SHIFT: Pitch UP
//					Pad 8 + SHIFT: Pitch Down
//
///					Pad 1 + Level/Depth: STEM VOICE Volume
//					Pad 2 + Level/Depth: STEM MELODY Volume
//					Pad 3 + Level/Depth: STEM BASS Volume
//					Pad 4 + Level/Depth: STEM DRUM Volume
///					Pad 5 + Level/Depth: STEM EFFECT Volume 
//					Pad 6 + Level/Depth: STEM EFFECT Volume
//					Pad 7 + Level/Depth: STEM EFFECT Volume 
//					Pad 8 + Level/Depth: STEM EFFECT Volume
//              -Lights behavior:
//                  - Stem pads lights and Mixxx skin will light on load(button) of STEM file, off on Load of non STEM file
//                  -Vinyl/CDJ:
//                      - Vinyl mode: 2 fast blink 
//                      - CDJ mode: 3 slower blink
//                 
//              -Sampler Volume (All Decks): 
//					-Sampler + Level/Depth: Sets Samplers 1-8 Gain levels
//                  -Configurable show sampler skin when enabled.
//              -Waveform zoom (All Decks):
//                  -If configuration enabled, Vinyl mode pitch bend is disabled and jog wheel side controls waveform zoom. CDJ mode unchanged.
//      
//
//
// 					
//					
var PioneerDDJREV1 = {};


/////////////////////////************/////////////////////////////////
//                       USER OPTIONS                              //
/////////////////////////***********////////////////////////////////
// If true DECK{N} start in Vinyl Mode, if false DECK{N} start in CDJ Mode. 
PioneerDDJREV1.vinylMode = [true, true, true, true];

// Per-deck SHIFT+LOAD library sort fields.
PioneerDDJREV1.librarySortDefaults = ["bpm", "artist", "date", "key"];
PioneerDDJREV1.librarySortDeckModes = PioneerDDJREV1.librarySortDefaults.slice(0);
// Last SHIFT+LOAD sort: repeat same field toggles order; different field uses sortByField default.
PioneerDDJREV1.lastLibrarySortField = null;
PioneerDDJREV1.lastLibrarySortOrder = null;

// If true, AutoSlip is enabled in Vinyl mode:
// jog touch enables slip and jog release disables slip.
PioneerDDJREV1.VinylSlipAutoff = false;


// If true, sampler UI is shown only while sampler volume is being adjusted.
PioneerDDJREV1.tempSamplerSkin = false;

// Headphone cue / master cue: pfl_classic, pfl_adjustments (default), pfl_studio (fixed headMix table).
PioneerDDJREV1.pflHeadphoneMode = "pfl_adjustments";
// pfl_studio: master cue button state (Mixxx has no separate "master cue" CO; headMix carries blend).
PioneerDDJREV1.studioMasterCueRequested = false;

// If true, Vinyl pitch bend controls waveform zoom. CDJ mode remains unchanged.
PioneerDDJREV1.sZoom = false;

// Braking behavior for play/pause transitions.
PioneerDDJREV1.brakingEnabled = false;
PioneerDDJREV1.brakingStartProfile = "off";
PioneerDDJREV1.brakingStopProfile = "off";
PioneerDDJREV1.brakingReverse = false;
// When false, non-classic brake profiles still use engine.brake(); only the delayed play=0 watchdog timer is skipped.
PioneerDDJREV1.brakeForceStopTimerEnabled = true;

// LED pulse behavior safeguards.
PioneerDDJREV1.syncPressPulseEnabled = true;
PioneerDDJREV1.syncPressPulseMs = 180;

//To disable Fader Start(s)p enter "Utilities Mode". Press Performance Pads 3 on the left deck. Fader Start is turned off.

//If true, Scratch Bank enabled
PioneerDDJREV1.scratchBankEnabled = false;

// Level/Depth routing: Off (default) controls both FX units; On routes FX1 vs SHIFT+FX2.
PioneerDDJREV1.splitFx = false;
/* 
// Startup MIDI profile for isolation testing:
// - "full": current behavior (all startup MIDI writes)
// - "sysex-only": only controller state query sysex
// - "none": no startup MIDI writes
PioneerDDJREV1.startupMidiProfile = "full"; */
////////////////////////*************/////////////////////////////////
//                       USER OPTIONS                              //
////////////////////////************////////////////////////////////




PioneerDDJREV1.lights = {
    beatFx: {
        status: 0x94,
        data1: 0x47,
    },
    shiftBeatFx: {
        status: 0x94,
        data1: 0x43,
    },
    deck1: {
        vuMeter: {
            status: 0xB0,
            data1: 0x02,
        },
        deckSelect: {
            status: 0x90,
            data1: 0x17,
        },
        playPause: {
            status: 0x90,
            data1: 0x0B,
        },
        shiftPlayPause: {
            status: 0x90,
            data1: 0x47,
        },
        cue: {
            status: 0x90,
            data1: 0x0C,
        },
        shiftCue: {
            status: 0x90,
            data1: 0x48,
        },
    },
    deck2: {
        vuMeter: {
            status: 0xB1,
            data1: 0x02,
        },
        deckSelect: {
            status: 0x91,
            data1: 0x17,
        },
        playPause: {
            status: 0x91,
            data1: 0x0B,
        },
        shiftPlayPause: {
            status: 0x91,
            data1: 0x47,
        },
        cue: {
            status: 0x91,
            data1: 0x0C,
        },
        shiftCue: {
            status: 0x91,
            data1: 0x48,
        },
    },
    deck3: {
        vuMeter: {
            status: 0xB2,
            data1: 0x02,
        },
        deckSelect: {
            status: 0x92,
            data1: 0x17,
        },
        playPause: {
            status: 0x92,
            data1: 0x0B,
        },
        shiftPlayPause: {
            status: 0x92,
            data1: 0x47,
        },
        cue: {
            status: 0x92,
            data1: 0x0C,
        },
        shiftCue: {
            status: 0x92,
            data1: 0x48,
        },
    },
    deck4: {
        vuMeter: {
            status: 0xB3,
            data1: 0x02,
        },
        deckSelect: {
            status: 0x93,
            data1: 0x17,
        },
        playPause: {
            status: 0x93,
            data1: 0x0B,
        },
        shiftPlayPause: {
            status: 0x93,
            data1: 0x47,
        },
        cue: {
            status: 0x93,
            data1: 0x0C,
        },
        shiftCue: {
            status: 0x93,
            data1: 0x48,
        },
    },
};

PioneerDDJREV1.lastCrossFader = 0;  // Last value of the cross fader
PioneerDDJREV1.lastFader = [0, 0];   // Last value of each channel fader

PioneerDDJREV1.lastStemChannel = null;

// Store timer IDs
PioneerDDJREV1.timers = {};
PioneerDDJREV1.brakeForceStopTimers = {};
PioneerDDJREV1.brakeGeneration = {};
PioneerDDJREV1.syncPulseTimers = {};
PioneerDDJREV1.syncPulseIgnoreUntil = {};

// Store cue points
PioneerDDJREV1.tempCuePoint = null;

// Jog wheel constants
PioneerDDJREV1.alpha = 1.0 / 8;
PioneerDDJREV1.beta = PioneerDDJREV1.alpha / 32;
PioneerDDJREV1.nonShiftScratchResolution = 720;

// Multiplier for fast seek through track using SHIFT+JOGWHEEL
PioneerDDJREV1.fastSeekScale = 50;
PioneerDDJREV1.bendScale = 0.8;

PioneerDDJREV1.tempoRanges = [0.06, 0.10, 0.16, 0.25];

PioneerDDJREV1.shiftButtonDown = [false, false];


// Object to store the tempo slider for each deck
PioneerDDJREV1.highResMSB = {
    "[Channel1]": { deckFader: 0 },
    "[Channel2]": { deckFader: 0 },
    "[Channel3]": { deckFader: 0 },
    "[Channel4]": { deckFader: 0 }
};

// Jog wheel loop adjust (per deck)
PioneerDDJREV1.loopAdjustIn = [false, false, false, false];
PioneerDDJREV1.loopAdjustOut = [false, false, false, false];
PioneerDDJREV1.loopAdjustMultiply = 10;
PioneerDDJREV1.jogPlatterTouched = [false, false, false, false];
PioneerDDJREV1.brakingActive = {};
PioneerDDJREV1.brakeInterruptedByScratch = [false, false, false, false];
PioneerDDJREV1.hotcuePreviewFromBrake = {};
PioneerDDJREV1.hotcueHoldActive = {};

PioneerDDJREV1.countActiveLoopLightTimers = function() {
    let active = 0;
    const groups = PioneerDDJREV1.timers || {};
    Object.keys(groups).forEach(function(group) {
        const groupTimers = groups[group] || {};
        Object.keys(groupTimers).forEach(function(control) {
            if (groupTimers[control] !== undefined) {
                active += 1;
            }
        });
    });
    return active;
};

PioneerDDJREV1.stopAllLoopLightTimers = function() {
    let stopped = 0;
    const groups = PioneerDDJREV1.timers || {};
    Object.keys(groups).forEach(function(group) {
        const groupTimers = groups[group] || {};
        Object.keys(groupTimers).forEach(function(control) {
            const timerId = groupTimers[control];
            if (timerId !== undefined) {
                engine.stopTimer(timerId);
                groupTimers[control] = undefined;
                stopped += 1;
            }
        });
    });
    return stopped;
};

// Beatjump pad (beatjump_size values)
PioneerDDJREV1.beatJumpActions = [
    "beatjump_backward",
    "beatjump_size_halve",
    "beatjump_size_double",
    "beatjump_forward",
    "prev", // go to previous track track, must be stopped/paused
    "back", // fast rewind
    "fwd", // fast forward
    "reverseroll" // censor
];


//These values are set in the Controller settings UI. 
// If JavaScript can't get the setting from the engine, default  
PioneerDDJREV1.beatLoopRollSizes = [
    1 / 16,
    1 / 8,
    1 / 4,
    1 / 2,
    1,
    2,
    4,
    8
];
PioneerDDJREV1.beatLoopRollDefaults = PioneerDDJREV1.beatLoopRollSizes.slice(0);
PioneerDDJREV1.beatLoopRollConfigs = PioneerDDJREV1.beatLoopRollDefaults.map(function(defaultSize) {
    return {
        mode: "fixed",
        value: defaultSize,
    };
});
PioneerDDJREV1.beatLoopPadResolvedSizes = PioneerDDJREV1.beatLoopRollDefaults.slice(0);

PioneerDDJREV1.beatLoopPadStates = [false, false, false, false, false, false, false, false];

PioneerDDJREV1.shiftPressed = false;
PioneerDDJREV1.stemShiftPressed = false; // legacy aggregate flag
PioneerDDJREV1.stemEffectPressed = false; // legacy aggregate flag
PioneerDDJREV1.sampleShiftPressed = false;
PioneerDDJREV1.samplerChannel = 0;
PioneerDDJREV1.wave = 5;
let currentStemMute;
let currentStemEffect;


PioneerDDJREV1.stemShiftHeld = new Array(16).fill(false);
PioneerDDJREV1.stemEffectHeld = new Array(16).fill(false);
PioneerDDJREV1.stemPadMovedWhileHeld = new Array(16).fill(false);
PioneerDDJREV1.stemToggleLastMs = new Array(16).fill(0);
PioneerDDJREV1.supportsStems = false;
PioneerDDJREV1.compatibilityMode = "auto";
PioneerDDJREV1.detectedMixxxVersion = "";
PioneerDDJREV1.componentContainer = null;
PioneerDDJREV1.useComponentsJS = true;
PioneerDDJREV1.stemsScratchbankGateLogged = false;
PioneerDDJREV1.scratchBankPadLocation = "none";
PioneerDDJREV1.samplerMode = "standard16";
PioneerDDJREV1.samplePadLayout = "standard";
// Backward-compatible alias for older code paths.
PioneerDDJREV1.samplerLayout = PioneerDDJREV1.samplerMode;
PioneerDDJREV1.resolvedOperatingPolicy = null;
PioneerDDJREV1.policyDecisionLogged = false;
PioneerDDJREV1.scratchBankFirstPressLogged = false;
PioneerDDJREV1.scratchBankGuardWarnings = {};

PioneerDDJREV1.Components = {};

PioneerDDJREV1.Components.resolve = function(componentKey) {
    if (!componentKey) {
        return null;
    }
    if (PioneerDDJREV1.componentContainer && PioneerDDJREV1.componentContainer[componentKey]) {
        return PioneerDDJREV1.componentContainer[componentKey];
    }
    if (PioneerDDJREV1.Components[componentKey]) {
        return PioneerDDJREV1.Components[componentKey];
    }
    const pascalKey = componentKey.charAt(0).toUpperCase() + componentKey.slice(1);
    return PioneerDDJREV1.Components[pascalKey] || null;
};

PioneerDDJREV1.Components.invoke = function(componentKey, methodName, argsArray) {
    const owner = PioneerDDJREV1.Components.resolve(componentKey);
    if (!owner || typeof owner[methodName] !== "function") {
        return undefined;
    }
    return owner[methodName].apply(owner, argsArray || []);
};

PioneerDDJREV1.ComponentJSTransport = {
    enabled: false,
    decks: [],
    hotcuePressStartedPlaying: {},
    hotcueHoldStates: {},
    activateStatusToDeck: {
        0x97: 1,
        0x99: 2,
        0x9B: 3,
        0x9D: 4,
    },
    clearStatusToDeck: {
        0x98: 1,
        0x9A: 2,
        0x9C: 3,
        0x9E: 4,
    },
    isAvailable: function() {
        return typeof components !== "undefined" &&
            typeof components.PlayButton === "function" &&
            typeof components.CueButton === "function" &&
            typeof components.SyncButton === "function" &&
            typeof components.HotcueButton === "function";
    },
    deckGroup: function(deckNum) {
        return "[Channel" + deckNum + "]";
    },
    deckStatus: function(deckNum) {
        return 0x90 + (deckNum - 1);
    },
    activateHotcueStatus: function(deckNum) {
        return 0x97 + (deckNum - 1) * 2;
    },
    hotcueLedConnections: [],
    hotcueLedCallback: function(value, group, control) {
        var match = control.match(/^hotcue_(\d+)_status$/);
        if (!match) {
            return;
        }
        var hotcueNum = parseInt(match[1], 10);
        var deckNum = script.deckFromGroup(group);
        if (!deckNum || hotcueNum < 1 || hotcueNum > 8) {
            return;
        }
        var midiStatus = PioneerDDJREV1.ComponentJSTransport.activateHotcueStatus(deckNum);
        var midiNote = hotcueNum - 1;
        midi.sendShortMsg(midiStatus, midiNote, value > 0 ? 0x7F : 0x00);
    },
    refreshHotcueLeds: function(deckNum) {
        var group = "[Channel" + deckNum + "]";
        var midiStatus = this.activateHotcueStatus(deckNum);
        for (var i = 1; i <= 8; i++) {
            var status = engine.getValue(group, "hotcue_" + i + "_status");
            midi.sendShortMsg(midiStatus, i - 1, status > 0 ? 0x7F : 0x00);
        }
    },
    refreshAllHotcueLeds: function() {
        for (var d = 1; d <= 4; d++) {
            this.refreshHotcueLeds(d);
        }
    },
    registerHotcueLedConnections: function() {
        this.unregisterHotcueLedConnections();
        for (var deckNum = 1; deckNum <= 4; deckNum++) {
            var group = "[Channel" + deckNum + "]";
            for (var i = 1; i <= 8; i++) {
                var conn = engine.makeConnection(group, "hotcue_" + i + "_status",
                    PioneerDDJREV1.ComponentJSTransport.hotcueLedCallback);
                if (conn) {
                    this.hotcueLedConnections.push(conn);
                }
            }
        }
        this.refreshAllHotcueLeds();
    },
    unregisterHotcueLedConnections: function() {
        for (var i = 0; i < this.hotcueLedConnections.length; i++) {
            if (this.hotcueLedConnections[i] && typeof this.hotcueLedConnections[i].disconnect === "function") {
                this.hotcueLedConnections[i].disconnect();
            }
        }
        this.hotcueLedConnections = [];
    },
    makeDeckComponents: function(deckNum) {
        const group = this.deckGroup(deckNum);
        const status = this.deckStatus(deckNum);
        const deckComponents = {
            group: group,
            playButton: new components.PlayButton({
                midi: [status, 0x0B],
                group: group,
            }),
            cueButton: new components.CueButton({
                midi: [status, 0x0C],
                group: group,
            }),
            // Keep sync fully script-owned to avoid ComponentJS one-shot
            // LED/timer behavior fighting manual sync pulse output.
            syncButton: null,
            hotcueButtons: {},
        };

        // Preserve existing transport semantics while adopting ComponentJS controls.
        deckComponents.playButton.input = function(_channel, _control, value, _status, inputGroup) {
            PioneerDDJREV1.Components.Transport.playPressed(value, inputGroup || group);
        };
        const hotcueStatus = this.activateHotcueStatus(deckNum);
        for (let i = 1; i <= 8; i++) {
            const control = 0x00 + (i - 1);
            deckComponents.hotcueButtons[i] = new components.HotcueButton({
                number: i,
                group: group,
                midi: [hotcueStatus, control],
            });
        }
        return deckComponents;
    },
    initialize: function() {
        this.shutdown();
        if (!this.isAvailable()) {
            this.enabled = false;
            return;
        }
        this.hotcuePressStartedPlaying = {};
        this.hotcueHoldStates = {};
        this.decks = [];
        for (let deckNum = 1; deckNum <= 4; deckNum++) {
            this.decks[deckNum] = this.makeDeckComponents(deckNum);
        }
        this.enabled = true;
    },
    shutdown: function() {
        if (this.decks && this.decks.length) {
            for (let deckNum = 1; deckNum <= 4; deckNum++) {
                const deck = this.decks[deckNum];
                if (!deck) {
                    continue;
                }
                const controls = [deck.playButton, deck.cueButton, deck.syncButton];
                for (let i = 1; i <= 8; i++) {
                    controls.push(deck.hotcueButtons && deck.hotcueButtons[i]);
                }
                controls.forEach(function(control) {
                    if (control && typeof control.disconnect === "function") {
                        control.disconnect();
                    }
                });
            }
        }
        this.hotcuePressStartedPlaying = {};
        this.hotcueHoldStates = {};
        this.decks = [];
        this.enabled = false;
    },
    holdStateKey: function(deckGroup, hotcueIndex) {
        return deckGroup + ":hotcue_" + hotcueIndex;
    },
    hasActiveHold: function(deckGroup) {
        const prefix = deckGroup + ":hotcue_";
        return Object.keys(this.hotcueHoldStates).some((key) => {
            const state = this.hotcueHoldStates[key];
            return key.indexOf(prefix) === 0 && state && !!state.active;
        });
    },
    recomputeDeckHotcueHoldActive: function(deckGroup) {
        PioneerDDJREV1.hotcueHoldActive[deckGroup] = this.hasActiveHold(deckGroup);
        if (!PioneerDDJREV1.hotcueHoldActive[deckGroup]) {
            PioneerDDJREV1.hotcuePreviewFromBrake[deckGroup] = false;
        }
    },
    notePlayTapDuringHotcueHold: function(deckGroup) {
        const prefix = deckGroup + ":hotcue_";
        Object.keys(this.hotcueHoldStates).forEach((key) => {
            const state = this.hotcueHoldStates[key];
            if (key.indexOf(prefix) === 0 && state && state.active) {
                state.playTappedDuringHold = true;
            }
        });
    },
    StopOnHotcueRelease: function(holdState) {
        if (!holdState) {
            return false;
        }
        // Keep-playing is only intentional when play was explicitly tapped during hold.
        return !holdState.playTappedDuringHold;
    },
    resolveDeck: function(status, group) {
        const groupMatch = group && group.match(/\[Channel([1-4])\]/);
        if (groupMatch) {
            return parseInt(groupMatch[1], 10);
        }
        if (this.activateStatusToDeck[status]) {
            return this.activateStatusToDeck[status];
        }
        if (this.clearStatusToDeck[status]) {
            return this.clearStatusToDeck[status];
        }
        return null;
    },
    playInput: function(channel, control, value, status, group) {
        const deckNum = this.resolveDeck(status, group);
        const deck = deckNum && this.decks[deckNum];
        if (this.enabled && deck && deck.playButton && typeof deck.playButton.input === "function") {
            deck.playButton.input(channel, control, value, status, group || deck.group);
            return;
        }
        PioneerDDJREV1.Components.Transport.playPressed(value, group || this.deckGroup(deckNum || (channel + 1)));
    },
    cueInput: function(channel, control, value, status, group) {
        const deckNum = this.resolveDeck(status, group);
        const resolvedGroup = group || this.deckGroup(deckNum || (channel + 1));
        const deck = script.deckFromGroup(resolvedGroup);
        if (value > 0 && PioneerDDJREV1.brakingActive[resolvedGroup]) {
            PioneerDDJREV1.Components.invoke("transport", "cancelBrakeForceStop", [resolvedGroup]);
            if (deck) {
                engine.brake(deck, false);
                engine.softStart(deck, false);
            }
            // Force CUE preview semantics by entering stopped state first.
            engine.setValue(resolvedGroup, "play", 0);
        }
        const componentDeck = deckNum && this.decks[deckNum];
        if (this.enabled && componentDeck &&
                componentDeck.cueButton && typeof componentDeck.cueButton.input === "function") {
            componentDeck.cueButton.input(channel, control, value, status, resolvedGroup);
            return;
        }
        engine.setValue(resolvedGroup, "cue_default", value);
    },
    syncInput: function(channel, control, value, status, group) {
        const deckNum = this.resolveDeck(status, group);
        const deck = deckNum && this.decks[deckNum];
        if (this.enabled && deck && deck.syncButton && typeof deck.syncButton.input === "function") {
            deck.syncButton.input(channel, control, value, status, group || deck.group);
            return;
        }
        PioneerDDJREV1.Components.Transport.syncPressed(
            value,
            group || this.deckGroup(deckNum || (channel + 1)),
            status
        );
    },
    hotcueInput: function(channel, control, value, status, group) {
        const deckNum = this.resolveDeck(status, group);
        const hotcueIndex = control + 1;
        if (hotcueIndex < 1 || hotcueIndex > 8) {
            return;
        }
        const deckGroup = group || this.deckGroup(deckNum || (channel + 1));
        const holdStateKey = this.holdStateKey(deckGroup, hotcueIndex);
        if (value > 0 && PioneerDDJREV1.brakingActive[deckGroup]) {
            // Clear both timer and brakingActive state to avoid stale brake gating.
            PioneerDDJREV1.Components.invoke("transport", "cancelActiveBrake", [deckGroup]);
            // Hotcue hold during brake should enter preview (stopped) state.
            engine.setValue(deckGroup, "play", 0);
            PioneerDDJREV1.hotcuePreviewFromBrake[deckGroup] = true;
        }
        if (this.clearStatusToDeck[status]) {
            if (value > 0) {
                engine.setValue(deckGroup, "hotcue_" + hotcueIndex + "_clear", 1);
            }
            // Clear-status events can arrive without a matching activate release path.
            // Proactively clear any hold bookkeeping for this pad to avoid stale hold gates.
            if (this.hotcueHoldStates[holdStateKey]) {
                this.hotcueHoldStates[holdStateKey].active = false;
                delete this.hotcueHoldStates[holdStateKey];
            }
            delete this.hotcuePressStartedPlaying[holdStateKey];
            this.recomputeDeckHotcueHoldActive(deckGroup);
            return;
        }
        const componentDeck = deckNum && this.decks[deckNum];
        const hotcueButton = componentDeck && componentDeck.hotcueButtons && componentDeck.hotcueButtons[hotcueIndex];
        const useComponentJS = this.enabled && hotcueButton && typeof hotcueButton.input === "function";
        if (value > 0) {
            const startedPlaying = engine.getValue(deckGroup, "play") > 0;
            this.hotcuePressStartedPlaying[holdStateKey] = startedPlaying;
            this.hotcueHoldStates[holdStateKey] = {
                startedPlaying: startedPlaying,
                playTappedDuringHold: false,
                brakeStateAtPress: !!PioneerDDJREV1.brakingActive[deckGroup],
                pressTimestamp: Date.now(),
                active: true,
            };
            this.recomputeDeckHotcueHoldActive(deckGroup);
            if (useComponentJS) {
                hotcueButton.input(channel, control, value, status, deckGroup);
            } else {
                engine.setValue(deckGroup, "hotcue_" + hotcueIndex + "_activate", 1);
            }
            return;
        }
        const holdState = this.hotcueHoldStates[holdStateKey] || {
            startedPlaying: !!this.hotcuePressStartedPlaying[holdStateKey],
            playTappedDuringHold: false,
            active: false,
        };
        delete this.hotcuePressStartedPlaying[holdStateKey];
        // Clear/deactivate hold first so downstream play decisions cannot read stale hold state.
        if (this.hotcueHoldStates[holdStateKey]) {
            this.hotcueHoldStates[holdStateKey].active = false;
            delete this.hotcueHoldStates[holdStateKey];
        }
        this.recomputeDeckHotcueHoldActive(deckGroup);
        const shouldStop = this.StopOnHotcueRelease(holdState);
        if (useComponentJS) {
            // Always forward release to ComponentJS so button state cannot remain latched.
            hotcueButton.input(channel, control, 0, status, deckGroup);
        } else if (shouldStop) {
            engine.setValue(deckGroup, "hotcue_" + hotcueIndex + "_activate", 0);
        }
        if (!shouldStop && holdState.playTappedDuringHold) {
            // Keep expected play-through behavior when hold release should not stop playback.
            engine.setValue(deckGroup, "play", 0);
        }
    },
};

PioneerDDJREV1.componentPlayButtonInput = {
    input: function(channel, control, value, status, group) {
        PioneerDDJREV1.ComponentJSTransport.playInput(channel, control, value, status, group);
    },
};

PioneerDDJREV1.componentCueButtonInput = {
    input: function(channel, control, value, status, group) {
        PioneerDDJREV1.ComponentJSTransport.cueInput(channel, control, value, status, group);
    },
};

PioneerDDJREV1.componentSyncButtonInput = {
    input: function(channel, control, value, status, group) {
        PioneerDDJREV1.ComponentJSTransport.syncInput(channel, control, value, status, group);
    },
};

PioneerDDJREV1.componentHotcueInput = {
    input: function(channel, control, value, status, group) {
        PioneerDDJREV1.ComponentJSTransport.hotcueInput(channel, control, value, status, group);
    },
};

PioneerDDJREV1.Components.Settings = {
    readString: function(settingName, defaultValue) {
        const raw = engine.getSetting(settingName);
        if (raw === undefined || raw === null || raw === "") {
            return defaultValue;
        }
        return String(raw).trim();
    },
    readBoolean: function(settingName, defaultValue) {
        const raw = engine.getSetting(settingName);
        if (raw === undefined || raw === null || raw === "") {
            return defaultValue;
        }
        if (typeof raw === "boolean") {
            return raw;
        }
        if (typeof raw === "number") {
            return raw > 0;
        }
        const normalized = String(raw).trim().toLowerCase();
        if (normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on") {
            return true;
        }
        if (normalized === "0" || normalized === "false" || normalized === "no" || normalized === "off") {
            return false;
        }
        return defaultValue;
    },
    normalizeDeckStartupMode: function(rawMode, fallbackVinyl) {
        const normalized = String(rawMode || "").trim().toLowerCase();
        if (normalized === "cdj" || normalized === "0" || normalized === "false" || normalized === "off" || normalized === "no") {
            return false;
        }
        if (normalized === "vinyl" || normalized === "1" || normalized === "true" || normalized === "on" || normalized === "yes") {
            return true;
        }
        return fallbackVinyl;
    },
    normalizeLibrarySortField: function(rawField, fallbackField) {
        const normalized = String(rawField || "").trim().toLowerCase();
        const allowed = new Set([
            "artist",
            "title",
            "album",
            "albumartist",
            "year",
            "genre",
            "composer",
            "grouping",
            "tracknumber",
            "filetype",
            "nativelocation",
            "comment",
            "duration",
            "bitrate",
            "bpm",
            "replaygain",
            "date",
            "timesplayed",
            "rating",
            "key",
            "preview",
            "coverart",
            "trackcolor",
            "lastplayed",
        ]);
        if (allowed.has(normalized)) {
            return normalized;
        }
        return fallbackField;
    },
    normalizeScratchResolution: function(rawValue, fallbackValue) {
        const parsed = Number(rawValue);
        // Backward compat: older UI used 900 (PLX). Normalize to 920.
        if (parsed === 900) {
            return 920;
        }
        if (parsed === 360 || parsed === 720 || parsed === 920 || parsed === 1536 || parsed === 2048) {
            return parsed;
        }
        return fallbackValue;
    },
    normalizePflHeadphoneMode: function(rawMode) {
        const normalized = String(rawMode || "").trim();
        if (normalized === "pfl_classic" || normalized === "pfl_adjustments" || normalized === "pfl_studio") {
            return normalized;
        }
        return "pfl_adjustments";
    },
    parseBeatLoopRollSetting: function(rawValue, fallbackValue) {
        const normalized = String(rawValue || "").trim().toLowerCase();
        if (normalized === "half") {
            return {
                mode: "relative",
                op: "half",
            };
        }
        if (normalized === "double") {
            return {
                mode: "relative",
                op: "double",
            };
        }
        const parsed = Number(rawValue);
        if (Number.isFinite(parsed) && parsed > 0) {
            return {
                mode: "fixed",
                value: parsed,
            };
        }
        return {
            mode: "fixed",
            value: fallbackValue,
        };
    },
    normalizeSamplePadLayout: function(rawValue, fallbackValue) {
        const normalized = String(rawValue || "").trim().toLowerCase();
        if (normalized === "standard" || normalized === "linear" || normalized === "0") {
            return "standard";
        }
        if (normalized === "banked_rows" || normalized === "bankedrows" || normalized === "banked" || normalized === "rows" || normalized === "1") {
            return "banked_rows";
        }
        // Backward compatibility: map older "alternate" values to mirror/reverse.
        if (normalized === "mirror_reverse" || normalized === "mirror" || normalized === "reverse" || normalized === "alternate" || normalized === "alt" || normalized === "2") {
            return "mirror_reverse";
        }
        return fallbackValue;
    },
    applyUserOptions: function() {
        for (let i = 0; i < 4; i++) {
            const variableName = "startupModeDeck" + (i + 1);
            const fallbackMode = PioneerDDJREV1.vinylMode[i] ? "vinyl" : "cdj";
            const configuredMode = this.readString(variableName, fallbackMode);
            PioneerDDJREV1.vinylMode[i] = this.normalizeDeckStartupMode(configuredMode, PioneerDDJREV1.vinylMode[i]);

            const sortSettingName = "librarySortDeck" + (i + 1);
            const fallbackSortField = PioneerDDJREV1.librarySortDefaults[i] || "bpm";
            const configuredSortField = this.readString(sortSettingName, fallbackSortField);
            PioneerDDJREV1.librarySortDeckModes[i] = this.normalizeLibrarySortField(configuredSortField, fallbackSortField);
        }
        PioneerDDJREV1.VinylSlipAutoff = this.readBoolean("vinylSlipAutoff", PioneerDDJREV1.VinylSlipAutoff);
        PioneerDDJREV1.nonShiftScratchResolution = this.normalizeScratchResolution(
            this.readString("nonShiftScratchFeel", String(PioneerDDJREV1.nonShiftScratchResolution)),
            720
        );
        PioneerDDJREV1.tempSamplerSkin = this.readBoolean("tempSamplerSkin", PioneerDDJREV1.tempSamplerSkin);
        PioneerDDJREV1.samplePadLayout = this.normalizeSamplePadLayout(
            this.readString("samplePadLayout", PioneerDDJREV1.samplePadLayout),
            PioneerDDJREV1.samplePadLayout
        );
        const configuredPflMode = this.readString("pflHeadphoneMode", "");
        PioneerDDJREV1.pflHeadphoneMode = this.normalizePflHeadphoneMode(configuredPflMode);
        PioneerDDJREV1.sZoom = this.readBoolean("sZoom", PioneerDDJREV1.sZoom);
        PioneerDDJREV1.brakingEnabled = this.readBoolean("brakingEnabled", PioneerDDJREV1.brakingEnabled);
        PioneerDDJREV1.brakingReverse = this.readBoolean("brakingReverse", PioneerDDJREV1.brakingReverse);
        PioneerDDJREV1.splitFx = this.readBoolean("SplitFx", PioneerDDJREV1.splitFx);
        for (let i = 0; i < 8; i++) {
            const settingName = "beatLoopRollsSize" + (i + 1);
            const parsed = this.parseBeatLoopRollSetting(
                this.readString(settingName, String(PioneerDDJREV1.beatLoopRollDefaults[i])),
                PioneerDDJREV1.beatLoopRollDefaults[i]
            );
            PioneerDDJREV1.beatLoopRollConfigs[i] = parsed;
            const fixedValue = parsed.mode === "fixed" ? parsed.value : PioneerDDJREV1.beatLoopRollDefaults[i];
            PioneerDDJREV1.beatLoopRollSizes[i] = fixedValue;
            PioneerDDJREV1.beatLoopPadResolvedSizes[i] = fixedValue;
        }
        const brakingStartRaw = this.readString("brakingStartProfile", "0").toLowerCase();
        const brakingStopRaw = this.readString("brakingStopProfile", "0").toLowerCase();
        const normalizeBrakingProfile = function(rawValue) {
            if (rawValue === "1" || rawValue === "classic") {
                return "classic";
            }
            if (rawValue === "2" || rawValue === "slow") {
                return "slow";
            }
            return "off";
        };
        PioneerDDJREV1.brakingStartProfile = normalizeBrakingProfile(brakingStartRaw);
        PioneerDDJREV1.brakingStopProfile = normalizeBrakingProfile(brakingStopRaw);
        if (!PioneerDDJREV1.brakingEnabled) {
            PioneerDDJREV1.brakingStartProfile = "off";
            PioneerDDJREV1.brakingStopProfile = "off";
        }
        const modeRaw = this.readString("compatibilityMode", "0").toLowerCase();
        if (modeRaw === "25" || modeRaw === "2.5") {
            PioneerDDJREV1.compatibilityMode = "2.5";
        } else if (modeRaw === "26" || modeRaw === "2.6") {
            PioneerDDJREV1.compatibilityMode = "2.6";
        } else {
            PioneerDDJREV1.compatibilityMode = "auto";
        }
    }
};

PioneerDDJREV1.Components.Capabilities = {
    isMeaningfulProbeValue: function(value) {
        if (value === undefined || value === null) {
            return false;
        }
        if (typeof value === "number" && Number.isFinite(value)) {
            return value !== 0;
        }
        return String(value).trim() !== "" && String(value).trim() !== "0";
    },
    parseMajorMinor: function(versionString) {
        const normalized = String(versionString || "").trim();
        const match = normalized.match(/(\d+)\.(\d+)/);
        if (!match) {
            return null;
        }
        return {
            major: parseInt(match[1], 10),
            minor: parseInt(match[2], 10)
        };
    },
    compareMajorMinor: function(lhs, rhs) {
        if (!lhs || !rhs) {
            return 0;
        }
        if (lhs.major !== rhs.major) {
            return lhs.major < rhs.major ? -1 : 1;
        }
        if (lhs.minor !== rhs.minor) {
            return lhs.minor < rhs.minor ? -1 : 1;
        }
        return 0;
    },
    isMixxx26OrNewer: function(versionString) {
        const parsed = this.parseMajorMinor(versionString);
        if (!parsed) {
            return false;
        }
        return this.compareMajorMinor(parsed, {major: 2, minor: 6}) >= 0;
    },
    isMixxx25OrOlder: function(versionString) {
        const parsed = this.parseMajorMinor(versionString);
        if (!parsed) {
            return false;
        }
        return this.compareMajorMinor(parsed, {major: 2, minor: 5}) <= 0;
    },
    detectVersionString: function() {
        try {
            if (typeof engine.getProductVersion === "function") {
                return String(engine.getProductVersion() || "");
            }
        } catch (e) {
            // fall through to empty version string
        }
        try {
            if (typeof mixxxVersion !== "undefined") {
                return String(mixxxVersion || "");
            }
        } catch (e) {
            // fall through to empty version string
        }
        try {
            const appVersion = engine.getValue("[App]", "version");
            if (appVersion !== undefined && appVersion !== null && appVersion !== "" && appVersion !== 0 && appVersion !== 0.0) {
                return String(appVersion);
            }
        } catch (e) {
            // fall through to empty version string
        }
        return "";
    },
    probeStemsSupport: function() {
        try {
            const stemCount = engine.getValue("[Channel1]", "stem_count");
            const stemMute = engine.getValue("[Channel1_Stem1]", "mute");
            const stemVolume = engine.getValue("[Channel1_Stem1]", "volume");
            const stemEffectEnabled = engine.getValue("[QuickEffectRack1_[Channel1_Stem1]]", "enabled");
            const allDefined = stemCount !== undefined &&
                stemMute !== undefined &&
                stemVolume !== undefined &&
                stemEffectEnabled !== undefined;
            if (!allDefined) {
                return false;
            }
            // On 2.5 unknown controls may report 0.0; do not treat that as stems availability.
            return this.isMeaningfulProbeValue(stemCount) ||
                this.isMeaningfulProbeValue(stemMute) ||
                this.isMeaningfulProbeValue(stemVolume) ||
                this.isMeaningfulProbeValue(stemEffectEnabled);
        } catch (e) {
            return false;
        }
    },
    inferRuntimeTier: function(probedSupportsStems) {
        if (this.isMixxx25OrOlder(PioneerDDJREV1.detectedMixxxVersion)) {
            return "25";
        }
        if (this.isMixxx26OrNewer(PioneerDDJREV1.detectedMixxxVersion)) {
            return "26";
        }
        return probedSupportsStems ? "26" : "25";
    },
    policyForTier: function(runtimeTier) {
        if (runtimeTier === "26") {
            return {
                supportsStems: true,
                scratchBankEnabled: false,
                scratchBankPadLocation: "none",
                samplerMode: "standard16",
                stemsPriority: true,
                runtimeTier: runtimeTier,
            };
        }
        return {
            supportsStems: false,
            scratchBankEnabled: true,
            scratchBankPadLocation: "upper",
            samplerMode: "standard16",
            stemsPriority: false,
            runtimeTier: runtimeTier,
        };
    },
    resolveOperatingPolicy: function(probedSupportsStems) {
        const mode = PioneerDDJREV1.compatibilityMode;
        const fallbackSupportsStems = !!probedSupportsStems;
        const runtimeTier = this.inferRuntimeTier(fallbackSupportsStems);

        if (mode === "2.6") {
            return this.policyForTier(runtimeTier);
        }

        if (mode === "2.5") {
            if (runtimeTier === "26") {
                return {
                    supportsStems: true,
                    scratchBankEnabled: true,
                    scratchBankPadLocation: "lower",
                    samplerMode: "dual8_exception",
                    stemsPriority: false,
                    runtimeTier: "26",
                };
            }
            return this.policyForTier("25");
        }
        return this.policyForTier(runtimeTier);
    },
    detectStems: function() {
        // Guard startup/race defaults until a single policy resolution is applied.
        PioneerDDJREV1.supportsStems = false;
        PioneerDDJREV1.scratchBankEnabled = false;
        PioneerDDJREV1.scratchBankPadLocation = "none";
        PioneerDDJREV1.samplerMode = "standard16";
        PioneerDDJREV1.samplerLayout = PioneerDDJREV1.samplerMode;
        PioneerDDJREV1.detectedMixxxVersion = this.detectVersionString();
        const probedSupportsStems = this.probeStemsSupport();
        const policy = this.resolveOperatingPolicy(probedSupportsStems);
        PioneerDDJREV1.resolvedOperatingPolicy = policy;
        PioneerDDJREV1.supportsStems = policy.supportsStems;
        PioneerDDJREV1.scratchBankEnabled = policy.scratchBankEnabled;
        PioneerDDJREV1.scratchBankPadLocation = policy.scratchBankPadLocation;
        PioneerDDJREV1.samplerMode = policy.samplerMode || "standard16";
        PioneerDDJREV1.samplerLayout = PioneerDDJREV1.samplerMode;
        PioneerDDJREV1.policyDecisionLogged = false;
        PioneerDDJREV1.scratchBankFirstPressLogged = false;
        if (PioneerDDJREV1.scratchBankEnabled) {
            PioneerDDJREV1.stemsScratchbankGateLogged = false;
        }
    }
};

PioneerDDJREV1.Components.ModeGate = {
    isStemsPriorityVersion: function() {
        if (PioneerDDJREV1.resolvedOperatingPolicy &&
                PioneerDDJREV1.resolvedOperatingPolicy.stemsPriority !== undefined) {
            return !!PioneerDDJREV1.resolvedOperatingPolicy.stemsPriority;
        }
        return PioneerDDJREV1.Components.Capabilities.isMixxx26OrNewer(PioneerDDJREV1.detectedMixxxVersion);
    },
    enforceStemsPriority: function(sourceLabel) {
        if (!PioneerDDJREV1.scratchBankEnabled) {
            return;
        }
        const stemsShouldWin = this.isStemsPriorityVersion() && PioneerDDJREV1.supportsStems;
        if (!stemsShouldWin) {
            return;
        }
        PioneerDDJREV1.scratchBankEnabled = false;
        PioneerDDJREV1.stemsScratchbankGateLogged = true;
    }
};

PioneerDDJREV1.Components.Stems = {
    stemLoadRetryDelayMs: 100,
    stemLoadMaxRetries: 4,
    stemLedConnections: [],
    canToggleStem: function(group) {
        const idx = this.stemIdxForGroup(group);
        if (idx < 0) {
            return true;
        }
        const now = Date.now();
        const last = PioneerDDJREV1.stemToggleLastMs[idx] || 0;
        if (now - last < 50) {
            return false;
        }
        PioneerDDJREV1.stemToggleLastMs[idx] = now;
        return true;
    },
    getDeckFromGroup: function(group) {
        const channelMatch = group && group.match(/\[Channel([1-4])\]/);
        if (channelMatch) {
            return parseInt(channelMatch[1], 10);
        }
        const stemMatch = group && group.match(/Channel([1-4])_Stem[1-4]/);
        if (stemMatch) {
            return parseInt(stemMatch[1], 10);
        }
        return parseInt(script.deckFromGroup(group), 10);
    },
    deckStatusFromGroup: function(group) {
        const deck = this.getDeckFromGroup(group);
        const statusByDeck = {
            1: 0x97,
            2: 0x99,
            3: 0x9B,
            4: 0x9D,
        };
        return statusByDeck[deck] || 0x97;
    },
    parseStemAddress: function(group) {
        const stemMatch = group && group.match(/Channel([1-4])_Stem([1-4])/);
        if (!stemMatch) {
            return null;
        }
        const deck = parseInt(stemMatch[1], 10);
        const stemIndex = parseInt(stemMatch[2], 10);
        return {
            deck: deck,
            stemIndex: stemIndex,
            deckGroup: "[Channel" + deck + "]",
        };
    },
    stemIdxForGroup: function(group) {
        const addr = this.parseStemAddress(group);
        if (!addr) {
            return -1;
        }
        return (addr.deck - 1) * 4 + (addr.stemIndex - 1);
    },
    stemMuteNoteForIndex: function(stemIndex) {
        return 0x70 + (4 - stemIndex);
    },
    stemEffectNoteForIndex: function(stemIndex) {
        return 0x74 + (4 - stemIndex);
    },
    stemGroupForControl: function(group) {
        const deck = this.getDeckFromGroup(group);
        return "[Channel" + deck + "_Stem";
    },
    stemEffectGroupForControl: function(group) {
        const deck = this.getDeckFromGroup(group);
        return "[QuickEffectRack1_[Channel" + deck + "_Stem";
    },
    hasStemControls: function(group) {
        if (!PioneerDDJREV1.supportsStems) {
            return false;
        }
        try {
            const stemGroup = this.stemGroupForControl(group) + "1]";
            const stemMute = engine.getValue(stemGroup, "mute");
            const stemVolume = engine.getValue(stemGroup, "volume");
            const stemEffectEnabled = engine.getValue(this.stemEffectGroupForControl(group) + "1]]", "enabled");
            return stemMute !== undefined &&
                stemVolume !== undefined &&
                stemEffectEnabled !== undefined;
        } catch (e) {
            return false;
        }
    },
    clearStemPadLeds: function(group) {
        const status = this.deckStatusFromGroup(group);
        for (let note = 0x70; note <= 0x77; note++) {
            midi.sendShortMsg(status, note, 0x00);
        }
    },
    refreshDeckStemLeds: function(group) {
        if (!this.hasStemControls(group)) {
            return;
        }
        const activeStemCount = Math.min(4, Math.max(0, Math.floor(Number(engine.getValue(group, "stem_count")))));
        const stemMutePrefix = this.stemGroupForControl(group);
        const stemEffectPrefix = this.stemEffectGroupForControl(group);
        const status = this.deckStatusFromGroup(group);
        for (let i = 1; i <= 4; i++) {
            const muteNote = this.stemMuteNoteForIndex(i);
            const effectNote = this.stemEffectNoteForIndex(i);
            if (activeStemCount < i) {
                midi.sendShortMsg(status, muteNote, 0x00);
                midi.sendShortMsg(status, effectNote, 0x00);
                continue;
            }
            const stemMuteGroup = stemMutePrefix + i + "]";
            const stemMuted = Number(engine.getValue(stemMuteGroup, "mute")) > 0;
            midi.sendShortMsg(status, muteNote, stemMuted ? 0x00 : 0x7F);
            const stemEffectGroup = stemEffectPrefix + i + "]]";
            const stemEffectOn = Number(engine.getValue(stemEffectGroup, "enabled")) > 0;
            midi.sendShortMsg(status, effectNote, stemEffectOn ? 0x7F : 0x00);
        }
    },
    onStemMuteChanged: function(value, group) {
        const stemAddress = this.parseStemAddress(group);
        if (!stemAddress) {
            return;
        }
        const status = this.deckStatusFromGroup(stemAddress.deckGroup);
        const note = this.stemMuteNoteForIndex(stemAddress.stemIndex);
        midi.sendShortMsg(status, note, Number(value) > 0 ? 0x00 : 0x7F);
    },
    onStemEffectChanged: function(value, group) {
        const stemAddress = this.parseStemAddress(group);
        if (!stemAddress) {
            return;
        }
        const status = this.deckStatusFromGroup(stemAddress.deckGroup);
        const note = this.stemEffectNoteForIndex(stemAddress.stemIndex);
        midi.sendShortMsg(status, note, Number(value) > 0 ? 0x7F : 0x00);
    },
    onDeckTrackLoaded: function(value, group) {
        if (!PioneerDDJREV1.supportsStems) {
            return;
        }
        if (Number(value) > 0) {
            engine.beginTimer(120, function() {
                PioneerDDJREV1.Components.invoke("stems", "syncStemLedsOnTrackLoad", [group]);
            }, true);
            return;
        }
        this.clearStemPadLeds(group);
    },
    registerStemLedConnections: function() {
        this.unregisterStemLedConnections();
        if (!PioneerDDJREV1.supportsStems) {
            return;
        }
        for (let deck = 1; deck <= 4; deck++) {
            const deckGroup = "[Channel" + deck + "]";
            if (!this.hasStemControls(deckGroup)) {
                continue;
            }
            const trackLoadedConnection = engine.makeConnection(deckGroup, "track_loaded", function(value, group) {
                PioneerDDJREV1.Components.invoke("stems", "onDeckTrackLoaded", [value, group]);
            });
            if (trackLoadedConnection && typeof trackLoadedConnection.disconnect === "function") {
                this.stemLedConnections.push(trackLoadedConnection);
            }
            // GUI/CO → pad LEDs: always enabled in Prod (register only when stem controls exist).
            const stemMutePrefix = this.stemGroupForControl(deckGroup);
            const stemEffectPrefix = this.stemEffectGroupForControl(deckGroup);
            for (let si = 1; si <= 4; si++) {
                const stemMuteGroup = stemMutePrefix + si + "]";
                const stemEffectGroup = stemEffectPrefix + si + "]]";
                const muteConn = engine.makeConnection(stemMuteGroup, "mute", function(value, group) {
                    PioneerDDJREV1.Components.invoke("stems", "onStemMuteChanged", [value, group]);
                });
                if (muteConn && typeof muteConn.disconnect === "function") {
                    this.stemLedConnections.push(muteConn);
                }
                const effConn = engine.makeConnection(stemEffectGroup, "enabled", function(value, group) {
                    PioneerDDJREV1.Components.invoke("stems", "onStemEffectChanged", [value, group]);
                });
                if (effConn && typeof effConn.disconnect === "function") {
                    this.stemLedConnections.push(effConn);
                }
            }
            this.syncStemLedsOnTrackLoad(deckGroup, 0);
        }
    },
    unregisterStemLedConnections: function() {
        this.stemToggleLastMs = {};
        if (!this.stemLedConnections || !this.stemLedConnections.length) {
            return;
        }
        for (let i = 0; i < this.stemLedConnections.length; i++) {
            const connection = this.stemLedConnections[i];
            if (connection && typeof connection.disconnect === "function") {
                connection.disconnect();
            }
        }
        this.stemLedConnections = [];
    },
    syncStemLedsOnTrackLoad: function(group, retryCount) {
        if (!PioneerDDJREV1.supportsStems) {
            return;
        }
        const attempt = retryCount || 0;
        if (!this.hasStemControls(group)) {
            if (attempt < this.stemLoadMaxRetries) {
                engine.beginTimer(this.stemLoadRetryDelayMs, function() {
                    PioneerDDJREV1.Components.invoke("stems", "syncStemLedsOnTrackLoad", [group, attempt + 1]);
                }, true);
            }
            return;
        }
        const rawStemCount = engine.getValue(group, "stem_count");
        const stemCount = Number(rawStemCount);
        if (!Number.isFinite(stemCount) || stemCount <= 0) {
            // Avoid transient all-muted writes while stems initialize after load.
            if (attempt < this.stemLoadMaxRetries) {
                engine.beginTimer(this.stemLoadRetryDelayMs, function() {
                    PioneerDDJREV1.Components.invoke("stems", "syncStemLedsOnTrackLoad", [group, attempt + 1]);
                }, true);
            }
            return;
        }
        const activeStemCount = Math.min(4, Math.max(0, Math.floor(stemCount)));
        const stemMutePrefix = this.stemGroupForControl(group);
        for (let i = 1; i <= 4; i++) {
            const stemMuteGroup = stemMutePrefix + i + "]";
            engine.setValue(stemMuteGroup, "mute", activeStemCount >= i ? 0 : 1);
        }
        this.refreshDeckStemLeds(group);
    },
    levelDepth: function(value) {
        // Regular Level/Depth FX1/FX2
        if (!PioneerDDJREV1.stemShiftPressed && !PioneerDDJREV1.stemEffectPressed && !PioneerDDJREV1.sampleShiftPressed) {
            const volumeBit = value / 127;
            if (PioneerDDJREV1.splitFx) {
                if (PioneerDDJREV1.shiftPressed) {
                    engine.setValue("[EffectRack1_EffectUnit2]", "super1", volumeBit);
                } else {
                    engine.setValue("[EffectRack1_EffectUnit1]", "super1", volumeBit);
                }
            } else {
                engine.setValue("[EffectRack1_EffectUnit1]", "super1", volumeBit);
                engine.setValue("[EffectRack1_EffectUnit2]", "super1", volumeBit);
            }
        }

        // Level/Depth for stem mute/effect adjustment while pads are held.
        if (PioneerDDJREV1.stemShiftPressed && PioneerDDJREV1.lastStemChannel) {
            const stemVolume = value / 127;
            engine.setValue(PioneerDDJREV1.lastStemChannel, "volume", stemVolume);
            const idx = this.stemIdxForGroup(PioneerDDJREV1.lastStemChannel);
            if (idx >= 0) {
                PioneerDDJREV1.stemPadMovedWhileHeld[idx] = true;
            }
        }
        if (PioneerDDJREV1.stemEffectPressed && PioneerDDJREV1.lastStemChannel) {
            const effectAmount = value / 127;
            engine.setValue(PioneerDDJREV1.lastStemChannel, "super1", effectAmount);
            const idx = this.stemIdxForGroup(PioneerDDJREV1.lastStemChannel);
            if (idx >= 0) {
                PioneerDDJREV1.stemPadMovedWhileHeld[idx] = true;
            }
        }
        // Level/Depth for sampler volume follows the active sampler layout.
        if (PioneerDDJREV1.sampleShiftPressed) {
            if (PioneerDDJREV1.tempSamplerSkin) {
                engine.setParameter("[Skin]", "show_samplers", true);
            }
            const sampleGain = value / 127;
            const mode = PioneerDDJREV1.samplerMode === "dual8_exception" ? "dual8_exception" : "standard16";
            const configuredCount = Number(engine.getValue("[App]", "num_samplers"));
            const availableCount = (!Number.isFinite(configuredCount) || configuredCount <= 0)
                ? 16
                : Math.max(1, Math.floor(configuredCount));
            const maxSampler = mode === "dual8_exception" ? 8 : Math.min(16, availableCount);
            for (let i = 1; i <= maxSampler; ++i) {
                engine.setValue("[Sampler" + i + "]", "pregain", sampleGain);
            }
        }
    },
    stemEffect: function(value, group) {
        if (!PioneerDDJREV1.supportsStems) {
            return;
        }
        PioneerDDJREV1.Components.ModeGate.enforceStemsPriority("stemEffect");
        PioneerDDJREV1.lastStemChannel = group;
        const idx = this.stemIdxForGroup(group);
        if (idx >= 0) {
            PioneerDDJREV1.stemEffectHeld[idx] = value > 0;
        }
        PioneerDDJREV1.stemEffectPressed = PioneerDDJREV1.stemEffectHeld.some(function(held) { return held; });
        if (value > 0) {
            if (idx >= 0) {
                PioneerDDJREV1.stemPadMovedWhileHeld[idx] = false;
            }
            return;
        }
        const movedWhileHeld = idx >= 0 ? PioneerDDJREV1.stemPadMovedWhileHeld[idx] : false;
        if (!movedWhileHeld && this.canToggleStem(group)) {
            currentStemEffect = engine.getValue(group, "enabled");
            const nextEffectVal = currentStemEffect === 0 ? 1 : 0;
            engine.setValue(group, "enabled", nextEffectVal);
            const stemAddr = this.parseStemAddress(group);
            if (stemAddr) {
                midi.sendShortMsg(
                    this.deckStatusFromGroup(stemAddr.deckGroup),
                    this.stemEffectNoteForIndex(stemAddr.stemIndex),
                    nextEffectVal > 0 ? 0x7F : 0x00
                );
            }
        }
        if (idx >= 0) {
            PioneerDDJREV1.stemPadMovedWhileHeld[idx] = false;
        }
    },
    stemShift: function(channel, control, value, status, group) {
        if (value > 0 &&
                control >= 0x70 && control <= 0x73 &&
                PioneerDDJREV1.Components.invoke("scratchBank", "isScratchBankOnStemPads", [])) {
            PioneerDDJREV1.Components.invoke("scratchBank", "loadScratchToDeck", [channel, control, value, status]);
            return;
        }
        if (!PioneerDDJREV1.supportsStems) {
            return;
        }
        PioneerDDJREV1.Components.ModeGate.enforceStemsPriority("stemShift");
        PioneerDDJREV1.lastStemChannel = group;
        const idx = this.stemIdxForGroup(group);
        if (idx >= 0) {
            PioneerDDJREV1.stemShiftHeld[idx] = value > 0;
        }
        PioneerDDJREV1.stemShiftPressed = PioneerDDJREV1.stemShiftHeld.some(function(held) { return held; });
        if (value > 0) {
            if (idx >= 0) {
                PioneerDDJREV1.stemPadMovedWhileHeld[idx] = false;
            }
            return;
        }
        const movedWhileHeld = idx >= 0 ? PioneerDDJREV1.stemPadMovedWhileHeld[idx] : false;
        if (!movedWhileHeld && this.canToggleStem(group)) {
            currentStemMute = engine.getValue(group, "mute");
            const nextMuteVal = currentStemMute === 0 ? 1 : 0;
            engine.setValue(group, "mute", nextMuteVal);
            const stemAddr = this.parseStemAddress(group);
            if (stemAddr) {
                midi.sendShortMsg(
                    this.deckStatusFromGroup(stemAddr.deckGroup),
                    this.stemMuteNoteForIndex(stemAddr.stemIndex),
                    nextMuteVal > 0 ? 0x00 : 0x7F
                );
            }
        }
        if (idx >= 0) {
            PioneerDDJREV1.stemPadMovedWhileHeld[idx] = false;
        }
    },
    loadSelectedTrack: function(value, group) {
        engine.setValue(group, "LoadSelectedTrack", value);
    }
};

PioneerDDJREV1.Components.Headphones = {
    anyPflActive: function() {
        for (let i = 1; i <= 4; i++) {
            if (engine.getValue("[Channel" + i + "]", "pfl")) {
                return true;
            }
        }
        return false;
    },
    toggleChannelCue: function(group, status, control) {
        const nextPfl = engine.getValue(group, "pfl") ? 0 : 1;
        engine.setValue(group, "pfl", nextPfl);
        midi.sendShortMsg(status, control, nextPfl ? 0x7F : 0x00);
    },
    applyStudioHeadMixFromState: function() {
        engine.setValue("[Master]", "headSplit", 0);
        const anyPfl = this.anyPflActive();
        const masterOn = !!PioneerDDJREV1.studioMasterCueRequested;
        let mix = 0.0;
        if (masterOn && anyPfl) {
            mix = 0.5;
        } else if (masterOn && !anyPfl) {
            mix = 1.0;
        } else if (!masterOn && anyPfl) {
            mix = 0.0;
        }
        engine.setParameter("[Master]", "headMix", mix);
    },
    studioPflHeadphoneCueing: function(control, _value, status, group) {
        const isChannelCueButton = control === 0x54;
        const isMasterCueButton = control === 0x63;
        if (isChannelCueButton) {
            this.toggleChannelCue(group, status, control);
            this.applyStudioHeadMixFromState();
            return;
        }
        if (isMasterCueButton) {
            PioneerDDJREV1.studioMasterCueRequested = !PioneerDDJREV1.studioMasterCueRequested;
            this.applyStudioHeadMixFromState();
            midi.sendShortMsg(status, control, PioneerDDJREV1.studioMasterCueRequested ? 0x7F : 0x00);
        }
    },
    applyPflClassicHeadphoneCue: function(isChannelCueButton, isMasterCueButton, group, status, control) {
        if (isChannelCueButton) {
            this.toggleChannelCue(group, status, control);
            return;
        }
        if (isMasterCueButton) {
            const currentHeadSplit = engine.getValue("[Master]", "headSplit");
            const nextHeadSplit = currentHeadSplit ? 0 : 1;
            engine.setValue("[Master]", "headSplit", nextHeadSplit);
            midi.sendShortMsg(status, control, nextHeadSplit ? 0x7F : 0x00);
        }
    },
    applyPflAdjustmentsHeadphoneCue: function(isChannelCueButton, isMasterCueButton, group, status, control) {
        const isAnyPflActive = this.anyPflActive();
        const currentHeadMix = engine.getParameter("[Master]", "headMix");

        if (isChannelCueButton) {
            this.toggleChannelCue(group, status, control);
            if (currentHeadMix > 0.0 && !isAnyPflActive) {
                engine.setParameter("[Master]", "headMix", 0.5);
            } else if (currentHeadMix > 0.49) {
                engine.setParameter("[Master]", "headMix", 1.0);
            }
            return;
        }
        if (isMasterCueButton) {
            if (isAnyPflActive) {
                engine.setParameter("[Master]", "headMix", currentHeadMix > 0.49 ? 0.0 : 0.5);
            } else {
                engine.setParameter("[Master]", "headMix", currentHeadMix > 0.49 ? 0.0 : 1.0);
            }
            midi.sendShortMsg(status, control, engine.getParameter("[Master]", "headMix") > 0.15 ? 0x7F : 0x00);
        }
    },
    cueing: function(control, value, status, group) {
        if (!value) {
            return;
        }
        const isChannelCueButton = control === 0x54;
        const isMasterCueButton = control === 0x63;
        const mode = PioneerDDJREV1.pflHeadphoneMode;

        if (mode === "pfl_classic") {
            this.applyPflClassicHeadphoneCue(isChannelCueButton, isMasterCueButton, group, status, control);
            return;
        }
        if (mode === "pfl_adjustments") {
            this.applyPflAdjustmentsHeadphoneCue(isChannelCueButton, isMasterCueButton, group, status, control);
            return;
        }
        if (mode === "pfl_studio") {
            this.studioPflHeadphoneCueing(control, value, status, group);
            return;
        }
        this.applyPflAdjustmentsHeadphoneCue(isChannelCueButton, isMasterCueButton, group, status, control);
    }
};

PioneerDDJREV1.Components.BeatPads = {
    resolvePadLoopRollSize: function(padIndex, value, group) {
        const config = PioneerDDJREV1.beatLoopRollConfigs[padIndex] || {
            mode: "fixed",
            value: PioneerDDJREV1.beatLoopRollDefaults[padIndex],
        };
        if (config.mode === "relative" && value) {
            const currentSize = Number(engine.getValue(group, "beatloop_size"));
            const fallbackSize = PioneerDDJREV1.beatLoopRollDefaults[padIndex];
            const baseSize = Number.isFinite(currentSize) && currentSize > 0 ? currentSize : fallbackSize;
            let nextSize = config.op === "half" ? (baseSize / 2) : (baseSize * 2);
            // Keep sizes in a sensible range for roll controls.
            nextSize = Math.max(1 / 32, Math.min(64, nextSize));
            engine.setValue(group, "beatloop_size", nextSize);
            return nextSize;
        }
        if (config.mode === "fixed") {
            return config.value;
        }
        return PioneerDDJREV1.beatLoopRollDefaults[padIndex];
    },
    loadPreviousTrackWithFallback: function(group) {
        // hardware workaround: send eject twice.
        engine.setValue(group, "eject", 1);
        engine.setValue(group, "eject", 1);
        engine.beginTimer(40, function() {
            engine.setValue(group, "eject", 1);
            engine.setValue(group, "eject", 0);
        }, true);
    },
    handleBeatLoopRoll: function(control, value, status, group) {
        const pressedBeatLoopPad = control - 0x50;
        if (pressedBeatLoopPad < 0 || pressedBeatLoopPad > 7) {
            return;
        }
        const pressedBeatLoopRollSize = this.resolvePadLoopRollSize(pressedBeatLoopPad, value, group);
        midi.sendShortMsg(status, control, value ? 0x7F : 0x00);
        if (value) {
            PioneerDDJREV1.beatLoopPadStates[pressedBeatLoopPad] = true;
            PioneerDDJREV1.beatLoopPadResolvedSizes[pressedBeatLoopPad] = pressedBeatLoopRollSize;
        } else {
            PioneerDDJREV1.beatLoopPadStates[pressedBeatLoopPad] = false;
        }
        if (value && !engine.getValue(group, "beatlooproll_activate")) {
            engine.setParameter(group, "beatloop_size", pressedBeatLoopRollSize);
            engine.setValue(group, "beatlooproll_activate", true);
        } else if (value) {
            engine.setValue(group, "beatloop_size", pressedBeatLoopRollSize);
        } else {
            const stillPressedIndex = PioneerDDJREV1.beatLoopPadStates.findIndex(val => val === true);
            if (stillPressedIndex >= 0) {
                engine.setValue(group, "beatloop_size", PioneerDDJREV1.beatLoopPadResolvedSizes[stillPressedIndex]);
            } else {
                engine.setValue(group, "beatlooproll_activate", false);
            }
        }
    },
    handleBeatJump: function(control, value, status, group) {
        const pressedBeatJumpPad = control - 0x40;
        if (pressedBeatJumpPad < 0 || pressedBeatJumpPad > 7) {
            return;
        }
        const ledValue = value ? 0x7F : 0x00;
        midi.sendShortMsg(status, control, ledValue);

        // Top row keeps one-shot beatjump behavior (press only).
        if (pressedBeatJumpPad < 4) {
            if (!value) {
                return;
            }
            const topRowAction = PioneerDDJREV1.beatJumpActions[pressedBeatJumpPad];
            engine.setValue(group, topRowAction, 1);
            engine.setValue(group, topRowAction, 0);
            return;
        }

        // Bottom row: P5 previous-track, P6/P7 hold rewind/forward, P8 hold censor.
        if (pressedBeatJumpPad === 4) {
            if (value) {
                this.loadPreviousTrackWithFallback(group);
            }
            return;
        }
        const holdAction = PioneerDDJREV1.beatJumpActions[pressedBeatJumpPad];
        engine.setValue(group, holdAction, value ? 1 : 0);
    }
};

PioneerDDJREV1.Components.Transport = {
    brakeProfiles: {
        off: {startFactor: 0, stopFactor: 0},
        classic: {startFactor: 1.0, stopFactor: 1.0},
        slow: {startFactor: 0.4, stopFactor: 0.5}
    },
    startProfileConfig: function() {
        if (!PioneerDDJREV1.brakingEnabled) {
            return this.brakeProfiles.off;
        }
        return this.brakeProfiles[PioneerDDJREV1.brakingStartProfile] || this.brakeProfiles.off;
    },
    stopProfileConfig: function() {
        if (!PioneerDDJREV1.brakingEnabled) {
            return this.brakeProfiles.off;
        }
        return this.brakeProfiles[PioneerDDJREV1.brakingStopProfile] || this.brakeProfiles.off;
    },
    syncPressed: function(value, group, status) {
        if (!value) {
            return;
        }
        const resolvedGroup = group || PioneerDDJREV1.getDeckGroupFromStatus(status);
        const resolvedStatus = PioneerDDJREV1.resolveDeckStatusForSync(resolvedGroup, status);
        if (!resolvedGroup) {
            return;
        }
        PioneerDDJREV1.pulseSyncLed(resolvedGroup, resolvedStatus, PioneerDDJREV1.syncPressPulseMs || 180);
        engine.setValue(resolvedGroup, "beatsync", 1);
    },
    syncLongPressed: function(value, group) {
        if (value) {
            // Shift/long press should engage sync lock and keep LED steady.
            engine.setValue(group, "sync_enabled", 1);
        }
    },
    cycleTempoRange: function(value, group) {
        if (value === 0) {
            return;
        }
        const currRange = engine.getValue(group, "rateRange");
        let idx = 0;
        for (let i = 0; i < PioneerDDJREV1.tempoRanges.length; i++) {
            if (currRange === PioneerDDJREV1.tempoRanges[i]) {
                idx = (i + 1) % PioneerDDJREV1.tempoRanges.length;
                break;
            }
        }
        engine.setValue(group, "rateRange", PioneerDDJREV1.tempoRanges[idx]);
    },
    cueShift: function(value, group) {
        if (engine.getValue(group, "play")) {
            engine.setValue(group, "start_stop", value);
        } else if (engine.getValue(group, "track_loaded")) {
            engine.setValue(group, "eject", value);
            engine.setValue(group, "eject", value);
        }
    },
    cancelBrakeForceStop: function(group) {
        if (PioneerDDJREV1.brakeForceStopTimers[group] !== undefined) {
            engine.stopTimer(PioneerDDJREV1.brakeForceStopTimers[group]);
            PioneerDDJREV1.brakeForceStopTimers[group] = undefined;
        }
    },
    cancelActiveBrake: function(group) {
        this.cancelBrakeForceStop(group);
        PioneerDDJREV1.brakingActive[group] = false;
        PioneerDDJREV1.hotcuePreviewFromBrake[group] = false;
        const deck = script.deckFromGroup(group);
        if (deck) {
            engine.brake(deck, false);
            engine.softStart(deck, false);
        }
    },
    scheduleBrakeForceStop: function(group, stopFactor) {
        // Only enforce a delayed hard-stop for non-classic braking profiles.
        if (stopFactor >= 1.0 || stopFactor <= 0) {
            return;
        }
        if (!PioneerDDJREV1.brakeForceStopTimerEnabled) {
            return;
        }

        this.cancelBrakeForceStop(group);
        PioneerDDJREV1.brakeGeneration[group] = (PioneerDDJREV1.brakeGeneration[group] || 0) + 1;
        const generation = PioneerDDJREV1.brakeGeneration[group];
        const startedAt = Date.now();
        const minWaitMs = 2200;
        const maxWaitMs = 3600;
        let lastPos = engine.getValue(group, "playposition");
        let stableTicks = 0;

        PioneerDDJREV1.brakeForceStopTimers[group] = engine.beginTimer(120, () => {
            if (PioneerDDJREV1.brakeGeneration[group] !== generation) {
                this.cancelBrakeForceStop(group);
                return;
            }
            // Hotcue hold flow owns stop/play outcome during an active hold window.
            if (PioneerDDJREV1.ComponentJSTransport.hasActiveHold(group)) {
                this.cancelBrakeForceStop(group);
                return;
            }

            const isPlayingNow = engine.getValue(group, "play") > 0;
            if (!isPlayingNow) {
                this.cancelBrakeForceStop(group);
                return;
            }

            const now = Date.now();
            const pos = engine.getValue(group, "playposition");
            const delta = Math.abs(pos - lastPos);
            lastPos = pos;

            if (delta < 0.0002) {
                stableTicks += 1;
            } else {
                stableTicks = 0;
            }

            const oldEnough = (now - startedAt) >= minWaitMs;
            const timedOut = (now - startedAt) >= maxWaitMs;
            const stableEnough = stableTicks >= 4;
            if ((oldEnough && stableEnough) || timedOut) {
                engine.setValue(group, "play", 0);
                PioneerDDJREV1.brakingActive[group] = false;
                this.cancelBrakeForceStop(group);
            }
        });
    },
    shiftPlayBrake: function(value, group, ignoreReverseSwap) {
        const deck = script.deckFromGroup(group);
        const activate = value > 0;
        const isPlaying = engine.getValue(group, "play") > 0;
        const startProfile = this.startProfileConfig();
        const stopProfile = this.stopProfileConfig();

        if (!ignoreReverseSwap && PioneerDDJREV1.brakingEnabled && PioneerDDJREV1.brakingReverse) {
            if (activate) {
                this.cancelBrakeForceStop(group);
                script.toggleControl(group, "play");
            }
            return;
        }
        if (!PioneerDDJREV1.brakingEnabled) {
            // Shift+Play fallback: stutter play (jump to cue and continue playback).
            if (activate) {
                this.cancelBrakeForceStop(group);
                engine.setValue(group, "cue_gotoandplay", 1);
            }
            return;
        }
        if (!activate) {
            return;
        }

        if (isPlaying) {
            this.cancelBrakeForceStop(group);
            if (stopProfile.stopFactor <= 0) {
                PioneerDDJREV1.brakingActive[group] = false;
                engine.setValue(group, "play", 0);
                return;
            }
            PioneerDDJREV1.brakingActive[group] = true;
            if (stopProfile.stopFactor === 1.0) {
                engine.brake(deck, true);
                return;
            }
            engine.brake(deck, value > 0, stopProfile.stopFactor);
            this.scheduleBrakeForceStop(group, stopProfile.stopFactor);
            return;
        }

        if (startProfile.startFactor <= 0) {
            this.cancelBrakeForceStop(group);
            engine.setValue(group, "play", 1);
            return;
        }
        this.cancelBrakeForceStop(group);
        engine.softStart(deck, value > 0, startProfile.startFactor);
    },
    playPressed: function(value, group) {
        if (!value) {
            return;
        }
        const activeHold = PioneerDDJREV1.ComponentJSTransport.hasActiveHold(group);
        PioneerDDJREV1.hotcueHoldActive[group] = activeHold;
        if (activeHold) {
            PioneerDDJREV1.ComponentJSTransport.notePlayTapDuringHotcueHold(group);
        }
        if (!activeHold && PioneerDDJREV1.hotcuePreviewFromBrake[group]) {
            // Stale preview flag should not hijack normal play behavior.
            PioneerDDJREV1.hotcuePreviewFromBrake[group] = false;
        }
        if (activeHold && PioneerDDJREV1.hotcuePreviewFromBrake[group]) {
            PioneerDDJREV1.hotcuePreviewFromBrake[group] = false;
            this.cancelActiveBrake(group);
            engine.setValue(group, "play", 1);
            return;
        }
        if (activeHold && engine.getValue(group, "play") > 0) {
            this.cancelActiveBrake(group);
            engine.setValue(group, "play", 1);
            return;
        }
        if (PioneerDDJREV1.brakingEnabled && PioneerDDJREV1.brakingReverse) {
            this.cancelBrakeForceStop(group);
            this.shiftPlayBrake(1, group, true);
            return;
        }
        if (PioneerDDJREV1.brakingActive[group]) {
            this.cancelActiveBrake(group);
            // If deck is already playing, preserve normal toggle semantics.
            if (engine.getValue(group, "play") > 0) {
                script.toggleControl(group, "play");
                return;
            }
            engine.setValue(group, "play", 1);
            return;
        }
        script.toggleControl(group, "play");
    }
};

PioneerDDJREV1.Components.Jog = {
    // ** jogTurn ** - scratch or bend based on vinyl mode
    jogTurn: function(channel, control, value, group) {
        const deckNum = channel + 1;
        const newVal = value - 64;
        if (engine.isScratching(deckNum)) {
            engine.scratchTick(deckNum, newVal);
        } else {
            const trackLoaded = engine.getValue(group, "track_loaded");
            if (PioneerDDJREV1.sZoom && PioneerDDJREV1.vinylMode[channel] && trackLoaded) {
                if (value === 63) {
                    PioneerDDJREV1.wave = PioneerDDJREV1.wave + 0.1;
                    engine.setValue(group, "waveform_zoom", PioneerDDJREV1.wave);
                } else if (value === 65) {
                    PioneerDDJREV1.wave = PioneerDDJREV1.wave - 0.1;
                    engine.setValue(group, "waveform_zoom", PioneerDDJREV1.wave);
                }
            } else {
                engine.setValue(group, "jog", newVal * PioneerDDJREV1.bendScale);
            }
        }
    },
    // ** jogSearch ** - wheel position search when loop adjust active
    jogSearch: function(channel, value, group) {
        const deckNum = channel + 1;
        let newVal = value - 64;
        const loopEnabled = engine.getValue(group, "loop_enabled");
        if (loopEnabled > 0) {
            if (PioneerDDJREV1.loopAdjustIn[channel]) {
                newVal = newVal * PioneerDDJREV1.loopAdjustMultiply + engine.getValue(group, "loop_start_position");
                engine.setValue(group, "loop_start_position", newVal);
                return;
            }
            if (PioneerDDJREV1.loopAdjustOut[channel]) {
                newVal = newVal * PioneerDDJREV1.loopAdjustMultiply + engine.getValue(group, "loop_end_position");
                engine.setValue(group, "loop_end_position", newVal);
                return;
            }
        }
        newVal = newVal * PioneerDDJREV1.fastSeekScale;
        if (engine.isScratching(deckNum)) {
            engine.scratchTick(deckNum, newVal);
        } else {
            engine.setValue(group, "jog", newVal * PioneerDDJREV1.bendScale);
        }
    },
    // ** jogTouch ** - platter touch; enables scratch or search
    jogTouch: function(channel, control, value, group) {
        const deckNum = channel + 1;
        const vinylEnabled = PioneerDDJREV1.vinylMode[channel];

        PioneerDDJREV1.jogPlatterTouched[channel] = value !== 0;

        if (PioneerDDJREV1.VinylSlipAutoff) {
            engine.setValue(group, "slip_enabled", value !== 0 ? 1 : 0);
        }

        if (PioneerDDJREV1.loopAdjustIn[channel] || PioneerDDJREV1.loopAdjustOut[channel]) {
            return;
        }

        if (value !== 0 && vinylEnabled) {
            PioneerDDJREV1.brakeInterruptedByScratch[channel] = !!PioneerDDJREV1.brakingActive[group];
            PioneerDDJREV1.Components.invoke("transport", "cancelActiveBrake", [group]);
            engine.scratchEnable(deckNum, PioneerDDJREV1.nonShiftScratchResolution, 33 + 1 / 3, PioneerDDJREV1.alpha, PioneerDDJREV1.beta);
        } else {
            engine.scratchDisable(deckNum);
            if (PioneerDDJREV1.brakeInterruptedByScratch[channel]) {
                PioneerDDJREV1.brakeInterruptedByScratch[channel] = false;
                engine.setValue(group, "play", 0);
            }
            if (PioneerDDJREV1.VinylSlipAutoff && vinylEnabled) {
                engine.setValue(group, "slip_enabled", 0);
            }
        }
    },
    toggleVinylMode: function(channel, value, group) {
        if (value > 0) {
            const deckNum = channel + 1;
            PioneerDDJREV1.vinylMode[channel] = !PioneerDDJREV1.vinylMode[channel];
            PioneerDDJREV1.loopAdjustIn[channel] = false;
            PioneerDDJREV1.loopAdjustOut[channel] = false;
            if (engine.isScratching(deckNum)) {
                engine.scratchDisable(deckNum);
            }
            if (PioneerDDJREV1.VinylSlipAutoff) {
                engine.setValue(group, "slip_enabled", 0);
            }
        }
    },
    shiftButton: function(value) {
        PioneerDDJREV1.shiftPressed = value > 0;
    }
};

PioneerDDJREV1.Components.Tempo = {
    tempoSliderMSB: function(value, group) {
        PioneerDDJREV1.highResMSB[group].tempoSlider = value;
    },
    tempoSliderLSB: function(value, group) {
        const fullValue = (PioneerDDJREV1.highResMSB[group].tempoSlider << 7) + value;
        engine.setValue(group, "rate", 1 - (fullValue / 0x2000));
    }
};

PioneerDDJREV1.Components.Sampler = {
    samplerPadContextByGroup: {},
    getActiveSamplerMode: function() {
        return PioneerDDJREV1.samplerMode === "dual8_exception" ? "dual8_exception" : "standard16";
    },
    getUserPadLayout: function() {
        if (PioneerDDJREV1.samplePadLayout === "banked_rows") {
            return "banked_rows";
        }
        if (PioneerDDJREV1.samplePadLayout === "mirror_reverse") {
            return "mirror_reverse";
        }
        return "standard";
    },
    isLowerScratchBankOwnershipActive: function() {
        return PioneerDDJREV1.scratchBankEnabled && PioneerDDJREV1.scratchBankPadLocation === "lower";
    },
    isLowerSamplerPadControl: function(control) {
        const padControl = Number(control);
        return Number.isFinite(padControl) && padControl >= 0x34 && padControl <= 0x37;
    },
    getAvailableSamplerCount: function() {
        const configuredCount = Number(engine.getValue("[App]", "num_samplers"));
        if (!Number.isFinite(configuredCount) || configuredCount <= 0) {
            return 16;
        }
        return Math.max(1, Math.floor(configuredCount));
    },
    normalizeDeckMidiChannel: function(channel) {
        const numeric = Number(channel);
        if (!Number.isFinite(numeric)) {
            return null;
        }
        const deckBaseChannelMap = {
            7: 0x97, 8: 0x97,
            9: 0x99, 10: 0x99,
            11: 0x9B, 12: 0x9B,
            13: 0x9D, 14: 0x9D,
            0x97: 0x97, 0x98: 0x97,
            0x99: 0x99, 0x9A: 0x99,
            0x9B: 0x9B, 0x9C: 0x9B,
            0x9D: 0x9D, 0x9E: 0x9D,
        };
        return deckBaseChannelMap[numeric] || null;
    },
    normalizeDeckMidiChannelFromStatus: function(status) {
        const numeric = Number(status);
        if (!Number.isFinite(numeric)) {
            return null;
        }
        const statusMap = {
            0x97: 0x97, 0x98: 0x97,
            0x99: 0x99, 0x9A: 0x99,
            0x9B: 0x9B, 0x9C: 0x9B,
            0x9D: 0x9D, 0x9E: 0x9D,
        };
        return statusMap[numeric] || null;
    },
    sideForInput: function(channel, status) {
        const normalizedFromStatus = this.normalizeDeckMidiChannelFromStatus(status);
        if (normalizedFromStatus === 0x97 || normalizedFromStatus === 0x9B) {
            return "left";
        }
        if (normalizedFromStatus === 0x99 || normalizedFromStatus === 0x9D) {
            return "right";
        }
        const normalized = this.normalizeDeckMidiChannel(channel);
        if (normalized === 0x97 || normalized === 0x9B) {
            return "left";
        }
        if (normalized === 0x99 || normalized === 0x9D) {
            return "right";
        }
        return null;
    },
    resolveSamplerNumber: function(channel, control, status) {
        const padControl = Number(control);
        if (padControl < 0x30 || padControl > 0x37) {
            return null;
        }
        if (this.isLowerScratchBankOwnershipActive() && this.isLowerSamplerPadControl(padControl)) {
            // In dual-mode exception, lower pads are ScratchBank-owned.
            return null;
        }
        const side = this.sideForInput(channel, status);
        if (!side) {
            return null;
        }
        const samplerMode = this.getActiveSamplerMode();
        const padLayout = this.getUserPadLayout();
        const padIndex = padControl - 0x30;
        if (samplerMode === "dual8_exception" && padIndex > 3) {
            return null;
        }
        const row = padIndex < 4 ? 0 : 1;
        const col = padIndex % 4;
        const mirroredCol = 3 - col;

        if (samplerMode === "dual8_exception") {
            const activeCol = (padLayout === "mirror_reverse") ? mirroredCol : col;
            const sideOffset = side === "left" ? 0 : 4;
            return sideOffset + activeCol + 1;
        }

        if (padLayout === "banked_rows") {
            const rowOffset = row * 8;
            const sideOffset = side === "left" ? 0 : 4;
            return rowOffset + sideOffset + col + 1;
        }

        if (padLayout === "mirror_reverse") {
            const rowOffset = row * 4;
            const sideOffset = side === "left" ? 0 : 8;
            return sideOffset + rowOffset + mirroredCol + 1;
        }

        const sideOffset = side === "left" ? 0 : 8;
        return sideOffset + padIndex + 1;
    },
    resolveSamplerGroup: function(channel, control, status) {
        const samplerNumber = this.resolveSamplerNumber(channel, control, status);
        if (!samplerNumber) {
            return null;
        }
        const availableCount = this.getAvailableSamplerCount();
        if (samplerNumber > availableCount) {
            print(
                "Sampler pad ignored: mapped sampler " + samplerNumber +
                " exceeds available sampler count " + availableCount
            );
            return null;
        }
        return "[Sampler" + samplerNumber + "]";
    },
    samplerPlayOutputCallbackFunction: function(value, group) {
        if (value !== 1) {
            return;
        }
        const padContext = this.samplerPadContextByGroup[group];
        if (padContext) {
            this.startSamplerBlink(padContext.channel, padContext.control, group);
        }
    },
    getSamplerLedTargets: function(samplerNumber) {
        const samplerMode = this.getActiveSamplerMode();
        const targets = [];
        const maxPad = samplerMode === "dual8_exception" ? 3 : 7;
        const sideConfigs = [
            {probeChannel: 7, probeStatus: 0x97, outputStatuses: [0x97, 0x9B]},
            {probeChannel: 9, probeStatus: 0x99, outputStatuses: [0x99, 0x9D]},
        ];
        sideConfigs.forEach((cfg) => {
            for (let padIndex = 0; padIndex <= maxPad; ++padIndex) {
                const note = 0x30 + padIndex;
                const resolvedSampler = this.resolveSamplerNumber(cfg.probeChannel, note, cfg.probeStatus);
                if (resolvedSampler !== samplerNumber) {
                    continue;
                }
                cfg.outputStatuses.forEach(function(outStatus) {
                    targets.push({ status: outStatus, note: note });
                });
            }
        });
        return targets;
    },
    samplerTrackLoadedOutputCallbackFunction: function(value, group) {
        const match = group && group.match(script.samplerRegEx);
        if (!match) {
            return;
        }
        const samplerNumber = Number(match[1]);
        if (!Number.isFinite(samplerNumber)) {
            return;
        }
        const state = value >= 0.5 ? 0x7F : 0x00;
        this.getSamplerLedTargets(samplerNumber).forEach(function(target) {
            midi.sendShortMsg(target.status, target.note, state);
        });
    },
    refreshSamplerTrackLoadedLeds: function() {
        const samplerMode = this.getActiveSamplerMode();
        const maxPad = samplerMode === "dual8_exception" ? 3 : 7;
        [0x97, 0x99, 0x9B, 0x9D].forEach(function(status) {
            for (let note = 0x30; note <= 0x30 + maxPad; ++note) {
                midi.sendShortMsg(status, note, 0x00);
            }
        });
        const availableCount = this.getAvailableSamplerCount();
        const maxSampler = samplerMode === "dual8_exception" ? Math.min(8, availableCount) : Math.min(16, availableCount);
        for (let samplerNumber = 1; samplerNumber <= maxSampler; ++samplerNumber) {
            const group = "[Sampler" + samplerNumber + "]";
            const trackLoaded = engine.getValue(group, "track_loaded");
            this.samplerTrackLoadedOutputCallbackFunction(trackLoaded, group);
        }
    },
    samplerPadPressed: function(channel, control, value, group, status) {
        const samplerGroup = this.resolveSamplerGroup(channel, control, status);
        if (!samplerGroup) {
            return;
        }
        PioneerDDJREV1.samplerChannel = channel;
        if (value > 0) {
            const normalizedChannel = this.normalizeDeckMidiChannel(channel);
            if (normalizedChannel !== null) {
                this.samplerPadContextByGroup[samplerGroup] = {
                    channel: normalizedChannel,
                    control: Number(control),
                };
            }
        }
        if (engine.getValue(samplerGroup, "track_loaded")) {
            engine.setValue(samplerGroup, "cue_gotoandplay", value);
        } else {
            engine.setValue(samplerGroup, "LoadSelectedTrack", value);
        }
    },
    samplerPadShiftPressed: function(channel, control, value, group, status) {
        const samplerGroup = this.resolveSamplerGroup(channel, control, status);
        if (!samplerGroup) {
            return;
        }
        if (engine.getValue(samplerGroup, "play")) {
            engine.setValue(samplerGroup, "cue_gotoandstop", value);
        } else if (engine.getValue(samplerGroup, "track_loaded")) {
            engine.setValue(samplerGroup, "eject", value);
        }
    },
    startSamplerBlink: function(channel, control, group) {
        let val = 0x7f;
        this.stopSamplerBlink(channel, control);
        PioneerDDJREV1.timers[channel][control] = engine.beginTimer(250, () => {
            val = 0x7f - val;
            midi.sendShortMsg(channel, control, val);
            midi.sendShortMsg((channel + 1), control, val);
            const isPlaying = engine.getValue(group, "play") === 1;
            if (!isPlaying) {
                this.stopSamplerBlink(channel, control);
                midi.sendShortMsg(channel, control, 0x7f);
                midi.sendShortMsg((channel + 1), control, 0x7f);
            }
        });
    },
    stopSamplerBlink: function(channel, control) {
        PioneerDDJREV1.timers[channel] = PioneerDDJREV1.timers[channel] || {};
        if (PioneerDDJREV1.timers[channel][control] !== undefined) {
            engine.stopTimer(PioneerDDJREV1.timers[channel][control]);
            PioneerDDJREV1.timers[channel][control] = undefined;
        }
    },
    samplerVolume: function(value, group) {
        PioneerDDJREV1.sampleShiftPressed = value > 0;
        PioneerDDJREV1.lastStemChannel = group;
        if (!PioneerDDJREV1.tempSamplerSkin) {
            return;
        }
        engine.setParameter("[Skin]", "show_samplers", false);
        this.refreshSamplerTrackLoadedLeds();
    }
};

PioneerDDJREV1.Components.ScratchBank = {
    deckMappings: {
        7: "[Channel1]",
        9: "[Channel2]",
        11: "[Channel3]",
        13: "[Channel4]",
        8: "[Channel1]",
        10: "[Channel2]",
        12: "[Channel3]",
        14: "[Channel4]"
    },
    samplerMappings: {
        7: {
            midiChannel: 0x97,
            side: "left"
        },
        9: {
            midiChannel: 0x99,
            side: "right"
        },
        11: {
            midiChannel: 0x9B,
            side: "left"
        },
        13: {
            midiChannel: 0x9D,
            side: "right"
        }
    },
    isScratchBankOnStemPads: function() {
        return PioneerDDJREV1.scratchBankEnabled && PioneerDDJREV1.scratchBankPadLocation === "upper";
    },
    normalizeChannelKey: function(channel) {
        // ScratchBank sampler mappings are authored for odd channel keys (7/9/11/13).
        // Some MIDI paths can provide even channel variants, so normalize to the
        // nearest odd deck key to avoid silent sampler-map misses.
        const numeric = Number(channel);
        if (!Number.isFinite(numeric)) {
            return channel;
        }
        if (this.samplerMappings[numeric]) {
            return numeric;
        }
        const oddKey = (numeric % 2 === 0) ? (numeric - 1) : numeric;
        if (this.samplerMappings[oddKey]) {
            return oddKey;
        }
        return numeric;
    },
    resolveActiveSamples: function(channel) {
        const normalizedChannel = this.normalizeChannelKey(channel);
        const channelMapping = this.samplerMappings[normalizedChannel] || {
            midiChannel: 0x97,
            side: "left"
        };
        const availableCount = this.getAvailableSamplerCount();
        const pool = this.resolveScratchSamplerPool(availableCount);
        const sideStart = channelMapping.side === "right" ? pool.rightStart : pool.leftStart;
        const controlBase = PioneerDDJREV1.scratchBankPadLocation === "upper" ? 0x70 : 0x34;
        const samples = {};
        for (let i = 0; i < 4; ++i) {
            samples[controlBase + i] = sideStart + i;
        }
        return {
            midiChannel: channelMapping.midiChannel,
            samples: samples
        };
    },
    getAvailableSamplerCount: function() {
        const configuredCount = Number(engine.getValue("[App]", "num_samplers"));
        if (!Number.isFinite(configuredCount) || configuredCount <= 0) {
            return 16;
        }
        return Math.max(1, Math.floor(configuredCount));
    },
    resolveScratchSamplerPool: function(_availableCount) {
        // ScratchBank contract: fixed sample pool 17-24 only.
        return {
            leftStart: 17,
            rightStart: 21,
        };
    },
    isSamplerNumberAvailable: function(samplerNumber, availableCount) {
        return Number.isFinite(samplerNumber) && samplerNumber >= 1 && samplerNumber <= availableCount;
    },
    warnGuardOnce: function(key, message) {
        if (PioneerDDJREV1.scratchBankGuardWarnings[key]) {
            return;
        }
        PioneerDDJREV1.scratchBankGuardWarnings[key] = true;
        print(message);
    },
    // ** Guard ** - ScratchBank requires Samplers 17-24
    ensureScratchSamplerAvailable: function(samplerNumber, availableCount, control, channel) {
        if (samplerNumber < 17 || samplerNumber > 24) {
            this.warnGuardOnce(
                "pool-range",
                "ScratchBank blocked: Sampler17..24 required. Mapped Sampler" + samplerNumber + " is outside range."
            );
            return false;
        }
        if (!this.isSamplerNumberAvailable(samplerNumber, availableCount)) {
            this.warnGuardOnce(
                "pool-count-" + availableCount,
                "ScratchBank blocked: Sampler17..24 required. Current active samplers: " + availableCount + ". Increase sampler count and load ScratchBank tracks in 17–24."
            );
            return false;
        }
        return true;
    },
    // ** loadScratchToDeck ** - clone sampler to deck when pad pressed
    loadScratchToDeck: function(channel, control, value, status) {
        if (!value) {
            return;
        }
        const isLowerSamplerPad = Number(control) >= 0x34 && Number(control) <= 0x37;
        const lowerScratchBankActive =
            PioneerDDJREV1.scratchBankEnabled &&
            PioneerDDJREV1.scratchBankPadLocation === "lower";
        if (isLowerSamplerPad && !lowerScratchBankActive) {
            // Outside dual exception, keep lower row routed as sampler pads.
            const samplerMethod = PioneerDDJREV1.shiftPressed
                ? "samplerPadShiftPressed"
                : "samplerPadPressed";
            PioneerDDJREV1.Components.invoke("sampler", samplerMethod, [channel, control, value, "", status]);
            return;
        }
        PioneerDDJREV1.Components.ModeGate.enforceStemsPriority("loadScratchToDeck");
        const upperScratchBankActive =
            PioneerDDJREV1.scratchBankEnabled &&
            PioneerDDJREV1.scratchBankPadLocation === "upper";
        const lowerScratchActivePress = lowerScratchBankActive && isLowerSamplerPad;
        const upperScratchActivePress = upperScratchBankActive && !isLowerSamplerPad;
        if (!lowerScratchActivePress && !upperScratchActivePress) {
            return;
        }
        const normalizedChannel = this.normalizeChannelKey(channel);
        const deckNumber = this.deckMappings[normalizedChannel] || this.deckMappings[channel] || "[Channel1]";
        const activeMapping = this.resolveActiveSamples(normalizedChannel);
        const midiChannel = activeMapping.midiChannel;
        const samplerNumber = activeMapping.samples[control];
        const availableCount = this.getAvailableSamplerCount();
        PioneerDDJREV1.scratchBankFirstPressLogged = true;
        if (!samplerNumber) {
            return;
        }
        if (!this.ensureScratchSamplerAvailable(samplerNumber, availableCount, control, channel)) {
            return;
        }
        const deckLoaded = engine.getValue(deckNumber, "play");
        if (deckLoaded) {
            print("Deck loaded. Unload deck to load scratch sample " + deckNumber);
            return;
        }
        const samplerGroup = "[Sampler" + samplerNumber + "]";
        if (!engine.getValue(samplerGroup, "track_loaded")) {
            this.warnGuardOnce(
                "pool-track-" + samplerNumber,
                "ScratchBank blocked: Sampler" + samplerNumber + " has no loaded track."
            );
            return;
        }
        try {
            Object.keys(activeMapping.samples).forEach(function(sampleControl) {
                midi.sendShortMsg(midiChannel, Number(sampleControl), 0x00);
            });
            midi.sendShortMsg(midiChannel, control, 0x7F);
            engine.setValue(deckNumber, "CloneFromSampler", samplerNumber);
            print("Loaded sample " + samplerNumber + " into deck " + deckNumber);
        } catch (error) {
            print("Error loading sample to deck: " + error);
        }
    },
};

PioneerDDJREV1.Components.Effects = {
    effectStates: {
        FX1: [false, false, false],
        FX2: [false, false, false]
    },
    buttonStates: {
        FX1: [false, false, false],
        FX2: [false, false, false]
    },
    buttonPressBuffer: {},
    buttonTimeouts: {},
    fxSelectorMovedWhileHeld: {
        FX1: false,
        FX2: false,
    },
    fxUpdate: function(value, group) {
        const newState = (value === 1);
        const midiValue = newState ? 0x7F : 0x00;
        if (group.startsWith("[EffectRack1_EffectUnit1")) {
            const effectNum = parseInt(group.match(/Effect(\d+)\]/)[1], 10);
            this.effectStates.FX1[effectNum - 1] = newState;
            midi.sendShortMsg(0x94, 0x6F + effectNum, midiValue);
        } else if (group.startsWith("[EffectRack1_EffectUnit2")) {
            const effectNum = parseInt(group.match(/Effect(\d+)\]/)[1], 10);
            this.effectStates.FX2[effectNum - 1] = newState;
            midi.sendShortMsg(0x95, 0x6F + effectNum, midiValue);
        }
    },
    bufferButtonPress: function(fxGroup, buttonIndex, mixxxUnit) {
        if (!this.buttonPressBuffer[fxGroup]) {
            this.buttonPressBuffer[fxGroup] = [];
        }
        if (!this.buttonTimeouts[fxGroup]) {
            this.fxSelectorMovedWhileHeld[fxGroup] = false;
        }
        this.buttonPressBuffer[fxGroup].push(buttonIndex);
        if (this.buttonTimeouts[fxGroup]) {
            engine.stopTimer(this.buttonTimeouts[fxGroup]);
        }
        this.buttonTimeouts[fxGroup] = engine.beginTimer(50, function() {
            PioneerDDJREV1.Components.invoke("effects", "processBufferedPresses", [fxGroup, mixxxUnit]);
        }, true);
    },
    processBufferedPresses: function(fxGroup, mixxxUnit) {
        const presses = this.buttonPressBuffer[fxGroup] || [];
        const pressedButtons = [...new Set(presses)];
        const uniquePressCount = pressedButtons.length;
        const skipEffectToggle = this.fxSelectorMovedWhileHeld[fxGroup];
        this.fxSelectorMovedWhileHeld[fxGroup] = false;
        if (!skipEffectToggle) {
            if (uniquePressCount === 1) {
                this.handleSinglePress(fxGroup, pressedButtons[0], mixxxUnit);
            } else if (uniquePressCount === 2) {
                this.handleDoublePress(fxGroup, pressedButtons, mixxxUnit);
            } else if (uniquePressCount >= 3) {
                this.handleTriplePress(fxGroup, mixxxUnit);
            }
        }
        this.buttonPressBuffer[fxGroup] = [];
        delete this.buttonTimeouts[fxGroup];
    },
    handleSinglePress: function(fxGroup, buttonIndex, mixxxUnit) {
        for (let i = 0; i < 3; i++) {
            this.effectStates[fxGroup][i] = (i === buttonIndex);
        }
        this.syncSingleEffect(fxGroup, buttonIndex, mixxxUnit);
    },
    handleDoublePress: function(fxGroup, buttonIndices, mixxxUnit) {
        for (let i = 0; i < 3; i++) {
            this.effectStates[fxGroup][i] = buttonIndices.includes(i);
        }
        this.syncDualEffects(fxGroup, mixxxUnit, buttonIndices);
    },
    handleTriplePress: function(fxGroup, mixxxUnit) {
        this.effectStates[fxGroup].fill(true);
        this.syncAllEffects(mixxxUnit);
    },
    FX: function(control, value, status) {
        let fxGroup = null;
        let mixxxUnit = null;
        if (status === 0x94) {
            fxGroup = "FX1";
            mixxxUnit = "[EffectRack1_EffectUnit1]";
        } else if (status === 0x95) {
            fxGroup = "FX2";
            mixxxUnit = "[EffectRack1_EffectUnit2]";
        }
        if (!fxGroup || !mixxxUnit) {
            return;
        }
        let buttonIndex = -1;
        switch (control) {
            case 0x70: buttonIndex = 0; break;
            case 0x71: buttonIndex = 1; break;
            case 0x72: buttonIndex = 2; break;
        }
        if (buttonIndex === -1) {
            return;
        }
        this.buttonStates[fxGroup][buttonIndex] = value > 0;
        this.bufferButtonPress(fxGroup, buttonIndex, mixxxUnit);
    },
    syncSingleEffect: function(fxGroup, activeButtonIndex, mixxxUnit) {
        const unitNumber = mixxxUnit.includes("Unit1") ? 1 : 2;
        if (this.buttonStates[fxGroup][activeButtonIndex]) {
            const activeGroup = "[EffectRack1_EffectUnit" + unitNumber + "_Effect" + (activeButtonIndex + 1) + "]";
            engine.setValue(activeGroup, "enabled", 0);
            return;
        }
        for (let i = 0; i < 3; i++) {
            const effectGroup = "[EffectRack1_EffectUnit" + unitNumber + "_Effect" + (i + 1) + "]";
            engine.setValue(effectGroup, "enabled", i === activeButtonIndex ? 1 : 0);
        }
    },
    syncDualEffects: function(_fxGroup, mixxxUnit, buttonIndices) {
        const unitNumber = mixxxUnit.includes("Unit1") ? 1 : 2;
        for (let i = 0; i < 3; i++) {
            const effectGroup = "[EffectRack1_EffectUnit" + unitNumber + "_Effect" + (i + 1) + "]";
            engine.setValue(effectGroup, "enabled", buttonIndices.includes(i) ? 1 : 0);
        }
    },
    syncAllEffects: function(mixxxUnit) {
        const unitNumber = mixxxUnit.includes("Unit1") ? 1 : 2;
        for (let i = 0; i < 3; i++) {
            const effectGroup = "[EffectRack1_EffectUnit" + unitNumber + "_Effect" + (i + 1) + "]";
            engine.setValue(effectGroup, "enabled", 1);
        }
    },
    syncNoEffects: function(mixxxUnit) {
        const unitNumber = mixxxUnit.includes("Unit1") ? 1 : 2;
        for (let i = 0; i < 3; i++) {
            const effectGroup = "[EffectRack1_EffectUnit" + unitNumber + "_Effect" + (i + 1) + "]";
            engine.setValue(effectGroup, "enabled", 0);
        }
    },
    selector: function(value, group) {
        const anyButtonPressed = this.buttonStates.FX1.some(function(state) { return state; }) ||
            this.buttonStates.FX2.some(function(state) { return state; });
        if (!anyButtonPressed) {
            if (value === 0x7F) {
                engine.setValue(group, "MoveUp", 1);
            } else if (value === 0x01) {
                engine.setValue("[Library]", "MoveDown", 1);
            }
        }
        const fxGroups = {
            FX1: "[EffectRack1_EffectUnit1",
            FX2: "[EffectRack1_EffectUnit2"
        };
        for (const groupKey in fxGroups) {
            const unitGroup = fxGroups[groupKey];
            for (let i = 0; i < 3; i++) {
                if (this.buttonStates[groupKey][i]) {
                    if (value === 0x7F) {
                        engine.setValue(unitGroup + "_Effect" + (i + 1) + "]", "effect_selector", -1);
                        this.fxSelectorMovedWhileHeld[groupKey] = true;
                    } else if (value === 0x01) {
                        engine.setValue(unitGroup + "_Effect" + (i + 1) + "]", "effect_selector", 1);
                        this.fxSelectorMovedWhileHeld[groupKey] = true;
                    }
                }
            }
        }
    }
};

PioneerDDJREV1.Components.Mixer = {
    toggleQuantize: function(value, group) {
        if (value) {
            script.toggleControl(group, "quantize");
        }
    },
    librarySort: function(group) {
        const deckIndexByGroup = {
            "[Channel1]": 0,
            "[Channel2]": 1,
            "[Channel3]": 2,
            "[Channel4]": 3,
        };
        const sortByField = {
            artist: { order: 1, column: 1 },
            title: { order: 1, column: 2 },
            album: { order: 1, column: 3 },
            albumartist: { order: 1, column: 4 },
            year: { order: 1, column: 5 },
            genre: { order: 1, column: 6 },
            composer: { order: 1, column: 7 },
            grouping: { order: 1, column: 8 },
            tracknumber: { order: 0, column: 9 },
            filetype: { order: 1, column: 10 },
            nativelocation: { order: 1, column: 11 },
            comment: { order: 1, column: 12 },
            duration: { order: 1, column: 13 },
            bitrate: { order: 1, column: 14 },
            bpm: { order: 1, column: 15 },
            replaygain: { order: 1, column: 16 },
            date: { order: 0, column: 17 },
            timesplayed: { order: 1, column: 18 },
            rating: { order: 1, column: 19 },
            key: { order: 1, column: 20 },
            preview: { order: 1, column: 21 },
            coverart: { order: 1, column: 22 },
            trackcolor: { order: 1, column: 30 },
            lastplayed: { order: 1, column: 31 },
        };
        const deckIndex = deckIndexByGroup[group];
        if (deckIndex === undefined) {
            return;
        }
        const defaultField = PioneerDDJREV1.librarySortDefaults[deckIndex] || "bpm";
        const configuredField = PioneerDDJREV1.librarySortDeckModes[deckIndex] || defaultField;
        const sortConfig = sortByField[configuredField] || sortByField[defaultField] || sortByField.bpm;
        let sortOrder;
        if (configuredField === PioneerDDJREV1.lastLibrarySortField) {
            const prev = PioneerDDJREV1.lastLibrarySortOrder;
            sortOrder = prev === 1 ? 0 : 1;
        } else {
            sortOrder = sortConfig.order;
            PioneerDDJREV1.lastLibrarySortField = configuredField;
        }
        PioneerDDJREV1.lastLibrarySortOrder = sortOrder;
        engine.setValue("[Library]", "sort_order", sortOrder);
        engine.setValue("[Library]", "sort_column_toggle", sortConfig.column);
    },
    crossFaderStart: function(group) {
        const opposite_channels = { 1: 2, 2: 1, 3: 4, 4: 3 };
        const glitchcorrectionChannels = { 1: 3, 2: 1, 2: 4, 4: 2 };
        const value = engine.getValue("[Master]", "crossfader");
        PioneerDDJREV1.lastCrossFader = value;
        const isAtLeft = Math.abs(value + 1) < 0.01;
        const isAtRight = Math.abs(value - 1) < 0.01;
        const channelGroups = { "[Channel1]": 1, "[Channel2]": 2, "[Channel3]": 3, "[Channel4]": 4 };
        if (group in channelGroups) {
            const current_channel = channelGroups[group];
            const opposite_channel = opposite_channels[current_channel];
            const opposite_group = "[Channel" + opposite_channel + "]";
            const stopChannel = glitchcorrectionChannels[current_channel];
            const stopGroup = "[Channel" + stopChannel + "]";
            if (PioneerDDJREV1.shiftPressed) {
                if (isAtLeft || isAtRight) {
                    engine.setValue(opposite_group, "play", 1);
                    engine.setValue(stopGroup, "play", 0);
                    engine.setValue(stopGroup, "cue_gotoandstop", 1);
                    engine.setValue(group, "play", 0);
                    engine.setValue(group, "cue_gotoandstop", 1);
                } else {
                    engine.setValue(opposite_group, "play", 1);
                    engine.setValue(stopGroup, "play", 0);
                    engine.setValue(stopGroup, "cue_gotoandstop", 1);
                    engine.setValue(group, "play", 0);
                    engine.setValue(group, "cue_gotoandstop", 1);
                }
            }
            PioneerDDJREV1.lastCrossFader = value;
        }
    }
};

PioneerDDJREV1.Components.Lifecycle = {
    // ** connect ** - register callbacks, startup MIDI, soft takeover
    connect: function() {
        engine.setValue("[EffectRack1_EffectUnit1]", "show_focus", 1);
        engine.setValue("[EffectRack1_EffectUnit2]", "show_focus", 1);

        engine.makeUnbufferedConnection("[Channel1]", "vu_meter", PioneerDDJREV1.vuMeterUpdate);
        engine.makeUnbufferedConnection("[Channel2]", "vu_meter", PioneerDDJREV1.vuMeterUpdate);
        engine.makeUnbufferedConnection("[Channel3]", "vu_meter", PioneerDDJREV1.vuMeterUpdate);
        engine.makeUnbufferedConnection("[Channel4]", "vu_meter", PioneerDDJREV1.vuMeterUpdate);

        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck1.vuMeter, false);
        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck2.vuMeter, false);
        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck3.vuMeter, false);
        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck4.vuMeter, false);
        //Todo:PioneerDDJREV1.startStartupModeBlink();

        engine.softTakeover("[Channel1]", "rate", true);
        engine.softTakeover("[Channel2]", "rate", true);
        engine.softTakeover("[Channel3]", "rate", true);
        engine.softTakeover("[Channel4]", "rate", true);
        engine.softTakeover("[EffectRack1_EffectUnit1_Effect1]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit1_Effect2]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit1_Effect3]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit1]", "mix", true);

        engine.softTakeover("[EffectRack1_EffectUnit2_Effect1]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit2_Effect2]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit2_Effect3]", "meta", true);
        engine.softTakeover("[EffectRack1_EffectUnit2]", "mix", true);

        const configuredSamplerCount = Number(engine.getValue("[App]", "num_samplers"));
        const samplerCount = (!Number.isFinite(configuredSamplerCount) || configuredSamplerCount <= 0)
            ? 16
            : Math.min(16, Math.floor(configuredSamplerCount));
        for (let i = 1; i <= samplerCount; ++i) {
            engine.makeConnection("[Sampler" + i + "]", "play", PioneerDDJREV1.samplerPlayOutputCallbackFunction);
            engine.makeConnection("[Sampler" + i + "]", "track_loaded", PioneerDDJREV1.samplerTrackLoadedOutputCallbackFunction);
        }
        PioneerDDJREV1.Components.invoke("sampler", "refreshSamplerTrackLoadedLeds", []);

        engine.makeConnection("[Channel1]", "track_loaded", PioneerDDJREV1.trackLoadedLED);
        engine.makeConnection("[Channel2]", "track_loaded", PioneerDDJREV1.trackLoadedLED);
        engine.makeConnection("[Channel3]", "track_loaded", PioneerDDJREV1.trackLoadedLED);
        engine.makeConnection("[Channel4]", "track_loaded", PioneerDDJREV1.trackLoadedLED);
        PioneerDDJREV1.Components.invoke("stems", "registerStemLedConnections", []);
        PioneerDDJREV1.ComponentJSTransport.registerHotcueLedConnections();
        PioneerDDJREV1.registerSyncLedConnections();


            midi.sendShortMsg(0x9F, 0x00, 0x7F);
            midi.sendShortMsg(0x9F, 0x01, 0x7F);
            midi.sendShortMsg(0x90, 0x10, 0x7F);
            midi.sendShortMsg(0x90, 0x11, 0x7F);
            midi.sendShortMsg(0x90, 0x4E, 0x7F);
            midi.sendShortMsg(0x90, 0x4C, 0x7F);
            midi.sendShortMsg(0x91, 0x10, 0x7F);
            midi.sendShortMsg(0x91, 0x11, 0x7F);
            midi.sendShortMsg(0x91, 0x4E, 0x7F);
            midi.sendShortMsg(0x91, 0x4C, 0x7F);


        engine.makeConnection("[Channel1]", "loop_enabled", PioneerDDJREV1.loopToggle);
        engine.makeConnection("[Channel2]", "loop_enabled", PioneerDDJREV1.loopToggle);
        engine.makeConnection("[Channel3]", "loop_enabled", PioneerDDJREV1.loopToggle);
        engine.makeConnection("[Channel4]", "loop_enabled", PioneerDDJREV1.loopToggle);

        engine.makeConnection("[Master]", "crossfader", PioneerDDJREV1.crossFaderStart);

        for (let i = 1; i <= 3; i++) {
            engine.makeConnection("[EffectRack1_EffectUnit1_Effect" + i + "]", "enabled", PioneerDDJREV1.fxUpdate);
        }
        for (let i = 1; i <= 3; i++) {
            engine.makeConnection("[EffectRack1_EffectUnit2_Effect" + i + "]", "enabled", PioneerDDJREV1.fxUpdate);
        }
        // Preserve current Mixxx FX state at init and only refresh controller LEDs.
        for (let i = 1; i <= 3; i++) {
            const unit1Group = "[EffectRack1_EffectUnit1_Effect" + i + "]";
            const unit2Group = "[EffectRack1_EffectUnit2_Effect" + i + "]";
            PioneerDDJREV1.fxUpdate(engine.getValue(unit1Group, "enabled"), unit1Group);
            PioneerDDJREV1.fxUpdate(engine.getValue(unit2Group, "enabled"), unit2Group);
        }

            midi.sendSysexMsg(
                [0xF0, 0x00, 0x40, 0x05, 0x00, 0x00, 0x02, 0x06, 0x00, 0x03, 0x01, 0xf7],
                12
            );
    },
    // ** disconnect ** - turn off LEDs, stop timers
    disconnect: function() {
        PioneerDDJREV1.Components.invoke("stems", "unregisterStemLedConnections", []);
        PioneerDDJREV1.ComponentJSTransport.unregisterHotcueLedConnections();
        PioneerDDJREV1.unregisterSyncLedConnections();


        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck1.vuMeter, false);
        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.deck2.vuMeter, false);

        // Turn off all sampler LEDs.
        for (let i = 0; i <= 7; ++i) {
            midi.sendShortMsg(0x97, 0x30 + i, 0x00);
            midi.sendShortMsg(0x98, 0x30 + i, 0x00);
            midi.sendShortMsg(0x99, 0x30 + i, 0x00);
            midi.sendShortMsg(0x9A, 0x30 + i, 0x00);
        }
        // Turn off all hotcue LEDs.
        for (let i = 0; i <= 7; ++i) {
            midi.sendShortMsg(0x97, 0x00 + i, 0x00);
            midi.sendShortMsg(0x98, 0x00 + i, 0x00);
            midi.sendShortMsg(0x99, 0x00 + i, 0x00);
            midi.sendShortMsg(0x9A, 0x00 + i, 0x00);
        }

        PioneerDDJREV1.setLoopButtonLights(0x90, 0x00);
        PioneerDDJREV1.setLoopButtonLights(0x91, 0x00);
        PioneerDDJREV1.setReloopLight(0x90, 0x00);
        PioneerDDJREV1.setReloopLight(0x91, 0x00);

        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.beatFx, false);
        PioneerDDJREV1.toggleLight(PioneerDDJREV1.lights.shiftBeatFx, false);
        for (let i = 0; i < 4; i++) {
            if (PioneerDDJREV1.modeBlinkTimers[i] !== null) {
                    engine.stopTimer(PioneerDDJREV1.modeBlinkTimers[i]);
                    PioneerDDJREV1.modeBlinkTimers[i] = null;
            } else {
             // PioneerDDJREV1.clearDeckSelectModeBlink(i);
            }
            if (PioneerDDJREV1.startupModeBlinkTimers[i] !== null) {
                engine.stopTimer(PioneerDDJREV1.startupModeBlinkTimers[i]);
                PioneerDDJREV1.startupModeBlinkTimers[i] = null;
            }
        }
    }
};

PioneerDDJREV1.Components.Bootstrap = {
    registerDomains: function() {
        if (!PioneerDDJREV1.componentContainer) {
            return;
        }
        PioneerDDJREV1.componentContainer.settings = PioneerDDJREV1.Components.Settings;
        PioneerDDJREV1.componentContainer.capabilities = PioneerDDJREV1.Components.Capabilities;
        PioneerDDJREV1.componentContainer.modeGate = PioneerDDJREV1.Components.ModeGate;
        PioneerDDJREV1.componentContainer.transport = PioneerDDJREV1.Components.Transport;
        PioneerDDJREV1.componentContainer.jog = PioneerDDJREV1.Components.Jog;
        PioneerDDJREV1.componentContainer.tempo = PioneerDDJREV1.Components.Tempo;
        PioneerDDJREV1.componentContainer.beatPads = PioneerDDJREV1.Components.BeatPads;
        PioneerDDJREV1.componentContainer.stems = PioneerDDJREV1.Components.Stems;
        PioneerDDJREV1.componentContainer.headphones = PioneerDDJREV1.Components.Headphones;
        PioneerDDJREV1.componentContainer.sampler = PioneerDDJREV1.Components.Sampler;
        PioneerDDJREV1.componentContainer.effects = PioneerDDJREV1.Components.Effects;
        PioneerDDJREV1.componentContainer.scratchBank = PioneerDDJREV1.Components.ScratchBank;
        PioneerDDJREV1.componentContainer.mixer = PioneerDDJREV1.Components.Mixer;
        PioneerDDJREV1.componentContainer.lifecycle = PioneerDDJREV1.Components.Lifecycle; 
     },
    connect: function() {
        if (!PioneerDDJREV1.useComponentsJS || !PioneerDDJREV1.componentContainer) {
            PioneerDDJREV1.Components.Lifecycle.connect();
            return;
        }
        const lifecycle = PioneerDDJREV1.componentContainer.lifecycle;
        if (lifecycle && typeof lifecycle.connect === "function") {
            lifecycle.connect();
            return;
        }
        PioneerDDJREV1.Components.Lifecycle.connect();
    },
    initialize: function() {
        if (typeof components === "undefined" || typeof components.ComponentContainer !== "function") {
            PioneerDDJREV1.useComponentsJS = false;
            PioneerDDJREV1.componentContainer = null;
            return;
        }
        PioneerDDJREV1.componentContainer = new components.ComponentContainer();
        this.registerDomains();
        PioneerDDJREV1.useComponentsJS = true;
    },
    disconnect: function() {
        if (!PioneerDDJREV1.useComponentsJS || !PioneerDDJREV1.componentContainer) {
            PioneerDDJREV1.Components.Lifecycle.disconnect();
            return;
        }
        const lifecycle = PioneerDDJREV1.componentContainer.lifecycle;
        if (lifecycle && typeof lifecycle.disconnect === "function") {
            lifecycle.disconnect();
            return;
        }
        PioneerDDJREV1.Components.Lifecycle.disconnect();
    },
    shutdown: function() {
        this.disconnect();
        if (PioneerDDJREV1.useComponentsJS && PioneerDDJREV1.componentContainer &&
                typeof PioneerDDJREV1.componentContainer.forEachComponent === "function") {
            PioneerDDJREV1.componentContainer.forEachComponent(function(component) {
                if (component && typeof component.disconnect === "function") {
                    component.disconnect();
                }
            });
        }
        PioneerDDJREV1.componentContainer = null;
        PioneerDDJREV1.useComponentsJS = false;
    }
};

//
// Init
//

PioneerDDJREV1.init = function () {
    PioneerDDJREV1.Components.Settings.applyUserOptions();
    PioneerDDJREV1.Components.Capabilities.detectStems();
    PioneerDDJREV1.Components.ModeGate.enforceStemsPriority("init");
    PioneerDDJREV1.Components.Bootstrap.initialize();
    PioneerDDJREV1.ComponentJSTransport.initialize();
    PioneerDDJREV1.Components.Bootstrap.connect();
};

//
// Channel level lights
//

PioneerDDJREV1.vuMeterUpdate = function (value, group) {
    const newVal = value * 120;

    switch (group) {
        case "[Channel1]":
            midi.sendShortMsg(0xB0, 0x02, newVal);
            break;
        case "[Channel2]":
            midi.sendShortMsg(0xB1, 0x02, newVal);
            break;
        case "[Channel3]":
            midi.sendShortMsg(0xB2, 0x02, newVal);
            break;
        case "[Channel4]":
            midi.sendShortMsg(0xB3, 0x02, newVal);
            break;
    }
};
PioneerDDJREV1.fxUpdate = function (value, group) {
    PioneerDDJREV1.Components.invoke("effects", "fxUpdate", [value, group]);
};
// ** trackLoadedLED ** - deck load indicator + hotcue refresh
PioneerDDJREV1.trackLoadedLED = function (value, group, _control) {
    midi.sendShortMsg(
        0x9F,
        group.match(script.channelRegEx)[1] - 1,
        value > 0 ? 0x7F : 0x00
    );
    var deckNum = script.deckFromGroup(group);
    if (deckNum) {
        engine.beginTimer(150, function() {
            PioneerDDJREV1.ComponentJSTransport.refreshHotcueLeds(deckNum);
        }, true);
    }
};

PioneerDDJREV1.toggleLight = function (midiIn, active) {
    midi.sendShortMsg(midiIn.status, midiIn.data1, active ? 0x7F : 0x00);
};

PioneerDDJREV1.getDeckStatusFromGroup = function(group) {
    const match = group && group.match(/\[Channel([1-4])\]/);
    if (!match) {
        return null;
    }
    return 0x8F + parseInt(match[1], 10);
};

PioneerDDJREV1.getDeckGroupFromStatus = function(status) {
    if (typeof status !== "number" || status < 0x90 || status > 0x93) {
        return null;
    }
    return "[Channel" + (status - 0x8F) + "]";
};

PioneerDDJREV1.resolveDeckStatusForSync = function(group, status) {
    if (typeof status === "number" && status >= 0x90 && status <= 0x93) {
        return status;
    }
    return PioneerDDJREV1.getDeckStatusFromGroup(group);
};

// ** pulseSyncLed ** - brief sync LED pulse on press
PioneerDDJREV1.pulseSyncLed = function(group, status, durationMs) {
    const resolvedStatus = PioneerDDJREV1.resolveDeckStatusForSync(group, status);
    const resolvedGroup = group || PioneerDDJREV1.getDeckGroupFromStatus(resolvedStatus);
    if (resolvedStatus === null) {
        return;
    }
    var timerKey = resolvedGroup || ("status:" + resolvedStatus);
    if (PioneerDDJREV1.syncPulseTimers[timerKey] !== undefined) {
        engine.stopTimer(PioneerDDJREV1.syncPulseTimers[timerKey]);
        PioneerDDJREV1.syncPulseTimers[timerKey] = undefined;
    }
    var pulseDuration = durationMs || 120;
    PioneerDDJREV1.syncPulseActive[timerKey] = true;
    midi.sendShortMsg(resolvedStatus, 0x58, 0x7F);
    PioneerDDJREV1.syncPulseTimers[timerKey] = engine.beginTimer(pulseDuration, function() {
        PioneerDDJREV1.syncPulseTimers[timerKey] = undefined;
        PioneerDDJREV1.syncPulseActive[timerKey] = false;
        PioneerDDJREV1.syncPulseIgnoreUntil[timerKey] = 0;
        if (!resolvedGroup || !engine.getValue(resolvedGroup, "sync_enabled")) {
            midi.sendShortMsg(resolvedStatus, 0x58, 0x00);
        }
    }, true);
};

PioneerDDJREV1.syncPulseActive = {};
PioneerDDJREV1.syncLedConnections = [];

// ** syncLedCallback ** - sync LED state from engine
PioneerDDJREV1.syncLedCallback = function(value, group) {
    var timerKey = group;
    var deckStatus = PioneerDDJREV1.getDeckStatusFromGroup(group);
    if (deckStatus === null) {
        return;
    }
    if (value > 0) {
        midi.sendShortMsg(deckStatus, 0x58, 0x7F);
        return;
    }
    // Let active pulse overlays control transient "on" state.
    if (PioneerDDJREV1.syncPulseActive[timerKey]) {
        return;
    }
    midi.sendShortMsg(deckStatus, 0x58, 0x00);
};

PioneerDDJREV1.registerSyncLedConnections = function() {
    PioneerDDJREV1.unregisterSyncLedConnections();
    for (var d = 1; d <= 4; d++) {
        var group = "[Channel" + d + "]";
        var conn = engine.makeConnection(group, "sync_enabled", PioneerDDJREV1.syncLedCallback);
        if (conn) {
            PioneerDDJREV1.syncLedConnections.push(conn);
        }
    }
    PioneerDDJREV1.refreshSyncLeds();
};

PioneerDDJREV1.unregisterSyncLedConnections = function() {
    for (var i = 0; i < PioneerDDJREV1.syncLedConnections.length; i++) {
        if (PioneerDDJREV1.syncLedConnections[i] && typeof PioneerDDJREV1.syncLedConnections[i].disconnect === "function") {
            PioneerDDJREV1.syncLedConnections[i].disconnect();
        }
    }
    PioneerDDJREV1.syncLedConnections = [];
    Object.keys(PioneerDDJREV1.syncPulseTimers).forEach(function(timerKey) {
        if (PioneerDDJREV1.syncPulseTimers[timerKey] !== undefined) {
            engine.stopTimer(PioneerDDJREV1.syncPulseTimers[timerKey]);
        }
    });
    PioneerDDJREV1.syncPulseTimers = {};
    PioneerDDJREV1.syncPulseActive = {};
    PioneerDDJREV1.syncPulseIgnoreUntil = {};
};

PioneerDDJREV1.refreshSyncLeds = function() {
    for (var d = 1; d <= 4; d++) {
        var group = "[Channel" + d + "]";
        var enabled = engine.getValue(group, "sync_enabled");
        var deckStatus = 0x90 + (d - 1);
        midi.sendShortMsg(deckStatus, 0x58, enabled > 0 ? 0x7F : 0x00);
    }
};

PioneerDDJREV1.modeBlinkTimers = [null, null, null, null];
PioneerDDJREV1.startupModeBlinkTimers = [null, null, null, null];

PioneerDDJREV1.getDeckSelectLight = function(channel) {
    const deckLights = [
        PioneerDDJREV1.lights.deck1.deckSelect,
        PioneerDDJREV1.lights.deck2.deckSelect,
        PioneerDDJREV1.lights.deck3.deckSelect,
        PioneerDDJREV1.lights.deck4.deckSelect,
    ];
    return deckLights[channel] || null;
};

PioneerDDJREV1.clearDeckSelectModeBlink = function(channel) {
    if (channel < 0 || channel > 3) {
        return;
    }
    if (PioneerDDJREV1.modeBlinkTimers[channel] !== null) {
        engine.stopTimer(PioneerDDJREV1.modeBlinkTimers[channel]);
        PioneerDDJREV1.modeBlinkTimers[channel] = null;
    }
    const deckSelectLight = PioneerDDJREV1.getDeckSelectLight(channel);
    if (deckSelectLight) {
        PioneerDDJREV1.toggleLight(deckSelectLight, false);
    }
};

PioneerDDJREV1.startDeckSelectModeBlink = function(channel, isVinylMode) {
    const deckSelectLight = PioneerDDJREV1.getDeckSelectLight(channel);
    if (!deckSelectLight) {
        return;
    }
    PioneerDDJREV1.clearDeckSelectModeBlink(channel);
    const blinkCount = isVinylMode ? 2 : 3;
    const intervalMs = isVinylMode ? 180 : 260;
    const totalEdges = blinkCount * 2;
    let edgeCount = 0;
    let lightOn = false;
    PioneerDDJREV1.modeBlinkTimers[channel] = engine.beginTimer(intervalMs, function() {
        lightOn = !lightOn;
        PioneerDDJREV1.toggleLight(deckSelectLight, lightOn);
        edgeCount++;
        if (edgeCount >= totalEdges) {
            PioneerDDJREV1.clearDeckSelectModeBlink(channel);
        }
    });
};

PioneerDDJREV1.startStartupModeBlink = function() {
    for (let i = 0; i < 4; i++) {
        if (PioneerDDJREV1.startupModeBlinkTimers[i] !== null) {
            engine.stopTimer(PioneerDDJREV1.startupModeBlinkTimers[i]);
            PioneerDDJREV1.startupModeBlinkTimers[i] = null;
        }
        const delayMs = i * 120;
        PioneerDDJREV1.startupModeBlinkTimers[i] = engine.beginTimer(delayMs, function() {
            PioneerDDJREV1.startupModeBlinkTimers[i] = null;
            PioneerDDJREV1.startDeckSelectModeBlink(i, PioneerDDJREV1.vinylMode[i]);
        }, true);
    }
};

//
// Loop IN/OUT ADJUST
//

PioneerDDJREV1.toggleLoopAdjustIn = function (channel, _control, value, _status, group) {
    if (value === 0 || engine.getValue(group, "loop_enabled") === 0) {
        return;
    }
    PioneerDDJREV1.loopAdjustIn[channel] = !PioneerDDJREV1.loopAdjustIn[channel];
    PioneerDDJREV1.loopAdjustOut[channel] = false;
};

PioneerDDJREV1.toggleLoopAdjustOut = function (channel, _control, value, _status, group) {
    if (value === 0 || engine.getValue(group, "loop_enabled") === 0) {
        return;
    }
    PioneerDDJREV1.loopAdjustOut[channel] = !PioneerDDJREV1.loopAdjustOut[channel];
    PioneerDDJREV1.loopAdjustIn[channel] = false;
};

// Two signals are sent here so that the light stays lit/unlit in its shift state too
PioneerDDJREV1.setReloopLight = function(status, value) {
    midi.sendShortMsg(status, 0x4D, value);
    midi.sendShortMsg(status, 0x50, value);
};

// ** setLoopButtonLights ** - beat loop pad LEDs
PioneerDDJREV1.setLoopButtonLights = function(status, value) {
    [0x10, 0x11, 0x4E, 0x4C].forEach(function (control) {
        midi.sendShortMsg(status, control, value);
    });
};

PioneerDDJREV1.startLoopLightsBlink = function(channel, control, status, group) {
    let blink = 0x7F;

    PioneerDDJREV1.stopLoopLightsBlink(control, status, group);

    PioneerDDJREV1.timers[group][control] = engine.beginTimer(500, () => {
        blink = 0x7F - blink;

        // When adjusting the loop out position, turn the loop in light off
        if (PioneerDDJREV1.loopAdjustOut[channel]) {
            midi.sendShortMsg(status, 0x10, 0x00);
            midi.sendShortMsg(status, 0x4C, 0x00);
        } else {
            midi.sendShortMsg(status, 0x10, blink);
            midi.sendShortMsg(status, 0x4C, blink);
        }

        // When adjusting the loop in position, turn the loop out light off
        if (PioneerDDJREV1.loopAdjustIn[channel]) {
            midi.sendShortMsg(status, 0x11, 0x00);
            midi.sendShortMsg(status, 0x4E, 0x00);
        } else {
            midi.sendShortMsg(status, 0x11, blink);
            midi.sendShortMsg(status, 0x4E, blink);
        }
    });
};

PioneerDDJREV1.stopLoopLightsBlink = function(control, status, group) {
    PioneerDDJREV1.timers[group] = PioneerDDJREV1.timers[group] || {};

    if (PioneerDDJREV1.timers[group][control] !== undefined) {
        engine.stopTimer(PioneerDDJREV1.timers[group][control]);
    }
    PioneerDDJREV1.timers[group][control] = undefined;
    PioneerDDJREV1.setLoopButtonLights(status, 0x7F);
};

// ** loopToggle ** - loop in/out button handler
PioneerDDJREV1.loopToggle = function (_channel, control, value, _status, group) {
    const status = group === "[Channel1]" ? 0x90 : 0x91,
        channel = group === "[Channel1]" ? 0 : 1;

    PioneerDDJREV1.setReloopLight(status, value ? 0x7F : 0x00);

    if (value) {
        PioneerDDJREV1.startLoopLightsBlink(channel, control, status, group);
    } else {
        PioneerDDJREV1.stopLoopLightsBlink(control, status, group);
        PioneerDDJREV1.loopAdjustIn[channel] = false;
        PioneerDDJREV1.loopAdjustOut[channel] = false;
    }
};


// ** beatLoopRoll ** - roll pad hold/release
PioneerDDJREV1.beatLoopRoll = function (_channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("beatPads", "handleBeatLoopRoll", [control, value, status, group]);
};


// ** beatJump ** - jump forward/back pads
PioneerDDJREV1.beatJump = function (_channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("beatPads", "handleBeatJump", [control, value, status, group]);
};



// ** headphoneCueing ** - Studio-style cue mix auto-adjust
PioneerDDJREV1.headphoneCueing = function (_channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("headphones", "cueing", [control, value, status, group]);
};


//
//Effects Buffering
// Button press buffering system to detect single, double, and triple presses
//

PioneerDDJREV1.buttonPressBuffer = PioneerDDJREV1.Components.Effects.buttonPressBuffer;
PioneerDDJREV1.buttonTimeouts = PioneerDDJREV1.Components.Effects.buttonTimeouts;

PioneerDDJREV1.bufferButtonPress = function (fxGroup, buttonIndex, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "bufferButtonPress", [fxGroup, buttonIndex, mixxxUnit]);
};


PioneerDDJREV1.processBufferedPresses = function (fxGroup, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "processBufferedPresses", [fxGroup, mixxxUnit]);
};

// Handle when single button in a group are pressed
PioneerDDJREV1.handleSinglePress = function (fxGroup, buttonIndex, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "handleSinglePress", [fxGroup, buttonIndex, mixxxUnit]);
};
// Handle when dual button in a group are pressed
PioneerDDJREV1.handleDoublePress = function (fxGroup, buttonIndices, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "handleDoublePress", [fxGroup, buttonIndices, mixxxUnit]);
};

PioneerDDJREV1.handleTriplePress = function (fxGroup, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "handleTriplePress", [fxGroup, mixxxUnit]);
};


//
// CUE/LOOP CALL
//

PioneerDDJREV1.cueLoopCallLeft = function (_channel, _control, value, _status, group) {
    if (value) {
        engine.setValue(group, "loop_scale", 0.5);
    }
};

PioneerDDJREV1.cueLoopCallRight = function (_channel, _control, value, _status, group) {
    if (value) {
        engine.setValue(group, "loop_scale", 2.0);
    }
};


// ** syncPressed ** 
PioneerDDJREV1.syncPressed = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.ComponentJSTransport.syncInput(_channel, _control, value, _status, group);
};

PioneerDDJREV1.syncLongPressed = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("transport", "syncLongPressed", [value, group]);
};

PioneerDDJREV1.cycleTempoRange = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("transport", "cycleTempoRange", [value, group]);
};

//
// Jog wheels
//

PioneerDDJREV1.jogTurn = function (channel, control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("jog", "jogTurn", [channel, control, value, group]);
};

// Function to handle jog wheel search
PioneerDDJREV1.jogSearch = function (channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("jog", "jogSearch", [channel, value, group]);
};

// Function to handle jog wheel touch
PioneerDDJREV1.jogTouch = function (channel, control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("jog", "jogTouch", [channel, control, value, group]);
};

// Function to toggle vinyl mode for a specific deck
PioneerDDJREV1.toggleVinylMode = function (channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("jog", "toggleVinylMode", [channel, value, group]);
};
//
// Shift button
//


PioneerDDJREV1.shiftButton = function (_channel, _control, value, _status, _group) {
    PioneerDDJREV1.Components.invoke("jog", "shiftButton", [value]);
};

//
// Tempo sliders
//
// The tempo option in deck preferences determine whether down/up


PioneerDDJREV1.shiftPlayBrake = function(_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("transport", "shiftPlayBrake", [value, group]);
};

PioneerDDJREV1.play = function(_channel, _control, value, _status, group) {
    PioneerDDJREV1.ComponentJSTransport.playInput(_channel, _control, value, _status, group);
};


//
// Sampler mode
//

PioneerDDJREV1.samplerPlayOutputCallbackFunction = function (value, group, _control) {
    PioneerDDJREV1.Components.invoke("sampler", "samplerPlayOutputCallbackFunction", [value, group]);
};

PioneerDDJREV1.samplerTrackLoadedOutputCallbackFunction = function (value, group, _control) {
    PioneerDDJREV1.Components.invoke("sampler", "samplerTrackLoadedOutputCallbackFunction", [value, group]);
};


PioneerDDJREV1.samplerPadPressed = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("sampler", "samplerPadPressed", [channel, control, value, group, status]);
};

PioneerDDJREV1.samplerPadShiftPressed = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("sampler", "samplerPadShiftPressed", [channel, control, value, group, status]);
};

PioneerDDJREV1.startSamplerBlink = function (channel, control, group) {
    PioneerDDJREV1.Components.invoke("sampler", "startSamplerBlink", [channel, control, group]);
};

PioneerDDJREV1.stopSamplerBlink = function (channel, control, _value, _status, _group) {
    PioneerDDJREV1.Components.invoke("sampler", "stopSamplerBlink", [channel, control]);
};

//
// Additional features
//

PioneerDDJREV1.toggleQuantize = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("mixer", "toggleQuantize", [value, group]);
};


//Load Selected Track and Sync Stem Lights 
PioneerDDJREV1.loadSelectedTrack = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("stems", "loadSelectedTrack", [value, group]);
};

//Cue Shift Manufacture Default
PioneerDDJREV1.cueShift = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("transport", "cueShift", [value, group]);
};

PioneerDDJREV1.cueDefault = function(_channel, _control, value, _status, group) {
    PioneerDDJREV1.ComponentJSTransport.cueInput(_channel, _control, value, _status, group);
};
//Sort Library
PioneerDDJREV1.librarySort = function (channel, control, value, status, group) {
    if (!value) {
        return;
    }
    PioneerDDJREV1.Components.invoke("mixer", "librarySort", [group]);
};

//Set Samplers 1-8 Gain 
PioneerDDJREV1.samplerVolume = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("sampler", "samplerVolume", [value, group]);
};

/////////////////////////////////////////////////
// Fader starts
/////////////////////////////////////////////////
PioneerDDJREV1.crossFaderStart = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("mixer", "crossFaderStart", [group]);
};

/////////////////////////////////////////////////
// STEMS
/////////////////////////////////////////////////
PioneerDDJREV1.levelDepth = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("stems", "levelDepth", [value]);
};
//Stem Effects
PioneerDDJREV1.stemEffect = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("stems", "stemEffect", [value, group]);
};
//Stem Mute
PioneerDDJREV1.stemShift = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("stems", "stemShift", [channel, control, value, status, group]);
};
/////////////////////////////////////////////////
// MAN. Effects
/////////////////////////////////////////////////
// Initialize effect states for tracking controller button states
PioneerDDJREV1.effectStates = PioneerDDJREV1.Components.Effects.effectStates;

// Button states tracker for detecting simultaneous presses
PioneerDDJREV1.buttonStates = PioneerDDJREV1.Components.Effects.buttonStates;
PioneerDDJREV1.activeCount = 0;

// FX button handler - processes button presses and maintains synchronization
PioneerDDJREV1.FX = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("effects", "FX", [control, value, status]);
};

// ** Single effect ** - enable one, disable others - sync to controller
PioneerDDJREV1.syncSingleEffect = function (fxGroup, activeButtonIndex, mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "syncSingleEffect", [fxGroup, activeButtonIndex, mixxxUnit]);
};

// ** Dual effects ** - sync to controller
PioneerDDJREV1.syncDualEffects = function (fxGroup, mixxxUnit, buttonIndices) {
    PioneerDDJREV1.Components.invoke("effects", "syncDualEffects", [fxGroup, mixxxUnit, buttonIndices]);
};

// ** All effects ** - three active – sync to controller
PioneerDDJREV1.syncAllEffects = function (mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "syncAllEffects", [mixxxUnit]);
};

// ** No effects ** - all off - sync to controller
PioneerDDJREV1.syncNoEffects = function (mixxxUnit) {
    PioneerDDJREV1.Components.invoke("effects", "syncNoEffects", [mixxxUnit]);
};

// Selector function for effect navigation
PioneerDDJREV1.selector = function (_channel, _control, value, _status, group) {
    PioneerDDJREV1.Components.invoke("effects", "selector", [value, group]);
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// Scratch Bank
PioneerDDJREV1.deckMappings = PioneerDDJREV1.Components.ScratchBank.deckMappings;
PioneerDDJREV1.samplerMappings = PioneerDDJREV1.Components.ScratchBank.samplerMappings;

// Main function to load scratch samples to decks
PioneerDDJREV1.loadScratchToDeck = function (channel, control, value, status, group) {
    PioneerDDJREV1.Components.invoke("scratchBank", "loadScratchToDeck", [channel, control, value, status]);
};



/////////////////////////////////////////////////
// Shutdown
/////////////////////////////////////////////////

PioneerDDJREV1.shutdown = function () {
    PioneerDDJREV1.ComponentJSTransport.shutdown();
    PioneerDDJREV1.Components.Bootstrap.shutdown();
};
