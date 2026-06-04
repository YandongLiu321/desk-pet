(function () {
    "use strict";

    // ---------------------------------------------------------------------------
    // TimelinePanel — placeholder for the keyframe animation timeline
    // ---------------------------------------------------------------------------

    class TimelinePanel {
        /**
         * @param {string} containerId - DOM element ID for the timeline container
         */
        constructor(containerId) {
            this._el = document.getElementById(containerId);
        }

        /**
         * Refresh the timeline view.
         * Currently a placeholder — full keyframe editing is planned for a
         * future phase once the animation system is fully wired.
         */
        refresh() {
            this._el.innerHTML =
                '<p style="color:#666;padding:8px;text-align:center;">' +
                'Timeline &mdash; drag keyframes here<br>' +
                '<small>(animation editing coming soon)</small>' +
                '</p>';
        }
    }

    // ---------------------------------------------------------------------------
    // Instantiate on window
    // ---------------------------------------------------------------------------

    window.timelinePanel = new TimelinePanel("timeline");
    window.TimelinePanel = TimelinePanel;
})();
