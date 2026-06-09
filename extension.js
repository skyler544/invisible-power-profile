/*
  Visible Power Profile
  GNOME Shell 50+ extension
  Contributors: @fthx
  License: GPL v3
*/

import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class VisiblePowerProfile {
    enable() {
        this._initTimeout = GLib.idle_add_once(GLib.PRIORITY_DEFAULT_IDLE, () => {
            const powerProfiles = Main.panel.statusArea.quickSettings._powerProfiles;
            this._toggle = powerProfiles?._powerProfilesToggle;
            this._indicator = powerProfiles?._indicator;

            this._toggle?.connectObject('notify::checked', () => this._indicator.show(), this);
        });

    }

    disable() {
        if (this._initTimeout)
            GLib.source_remove(this._initTimeout);
        this._initTimeout = null;

        this._toggle?.disconnectObject(this);
        this._toggle = null;
        this._indicator = null;
    }
}
