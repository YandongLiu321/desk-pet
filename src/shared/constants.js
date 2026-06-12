// Shared constants — single source of truth for cross-file strings
// Works in both CommonJS (main process) and browser (renderer) environments

const IPC = {
	// Conversation
	CONVERSATION_SEND: "conversation:send",
	CONVERSATION_CHUNK: "conversation:chunk",
	CONVERSATION_DONE: "conversation:done",
	CONVERSATION_ERROR: "conversation:error",
	CONVERSATION_GET_HISTORY: "conversation:get-history",
	CONVERSATION_ABORT: "conversation:abort",

	// Tasks
	TASK_GET_ALL: "task:get-all",
	TASK_GET_BY_ID: "task:get-by-id",
	TASK_GET_MODE: "task:get-mode",
	TASK_CREATE: "task:create",
	TASK_UPDATE: "task:update",
	TASK_TOGGLE_SUBTASK: "task:toggle-subtask",
	TASK_COMPLETE: "task:complete",
	TASK_UPDATE_PROGRESS: "task:update-progress",
	TASK_DELETE: "task:delete",

	// App / Mode
	APP_SWITCH_MODE: "app:switch-mode",
	APP_GET_STATE: "app:get-state",
	APP_GET_CHARACTER: "app:get-character",
	APP_GET_RELATIONSHIP: "app:get-relationship",
	MODE_ACTIVATED: "mode:activated",
	MODE_DEACTIVATED: "mode:deactivated",

	// Pomodoro
	POMODORO_START: "pomodoro:start",
	POMODORO_STOP: "pomodoro:stop",
	POMODORO_GET_STATUS: "pomodoro:get-status",
	POMODORO_TICK: "pomodoro:tick",
	POMODORO_END: "pomodoro:end",

	// Settings (完整)
	SETTINGS_GET: "settings:get",
	SETTINGS_SET: "settings:set",
	SETTINGS_GET_API_KEY: "settings:get-api-key",
	SETTINGS_SET_API_KEY: "settings:set-api-key",
	SETTINGS_GET_WALLPAPER: "settings:get-wallpaper",
	SETTINGS_UPDATE_WALLPAPER: "settings:update-wallpaper",
	SETTINGS_GET_AUDIO_CONFIG: "settings:get-audio-config",
	SETTINGS_CHANGED: "settings:changed",

	// Theme
	THEME_GET: "theme:get",
	THEME_SET: "theme:set",

	// Window control
	WINDOW_SET_IGNORE_MOUSE_EVENTS: "window:set-ignore-mouse-events",

	// Wallpaper Engine
	WALLPAPER_LOAD_WE: "wallpaper:load-we",
	WALLPAPER_LIST_WE: "wallpaper:list-we",

	// Window
	WINDOW_HIDE: "window:hide",
	WINDOW_CLOSE_MODE: "window:close-mode",
	WINDOW_MOVE_BY: "window:move-by",

	// Scene
	SCENE_LOAD: "scene:load",
	SCENE_SAVE: "scene:save",
	SCENE_GET: "scene:get",

	// Editor
	EDITOR_OPEN: "editor:open",
	EDITOR_APPLY: "editor:apply",
	EDITOR_UPDATE_PROPERTY: "editor:update-property",

	// Proactive
	PROACTIVE_TRIGGER: "proactive:trigger",
	PROACTIVE_GET_STATE: "proactive:get-state",
	PROACTIVE_SET_CONFIG: "proactive:set-config",

	// Memory
	MEMORY_LIST: "memory:list",
	MEMORY_SEARCH: "memory:search",
	MEMORY_DELETE: "memory:delete",
	MEMORY_CLEAR: "memory:clear",
};

const INTENT = {
	CREATE_TASK: "create_task",
	SWITCH_MODE: "switch_mode",
};

const MODE = {
	PET: "pet",
	WALLPAPER: "wallpaper",
	SOFTWARE: "software",
};

const ERROR_CODE = {
	TASK_NOT_FOUND: "TASK_NOT_FOUND",
	TASK_CREATE_INVALID: "TASK_CREATE_INVALID",
	LLM_NETWORK: "LLM_NETWORK",
	LLM_API: "LLM_API",
	LLM_TIMEOUT: "LLM_TIMEOUT",
	POMODORO_NOT_RUNNING: "POMODORO_NOT_RUNNING",
	MODE_INVALID: "MODE_INVALID",
	INTERNAL: "INTERNAL",
};

const API_CONFIG = {
	URL: "https://api.deepseek.com/v1/chat/completions",
	MODEL: "deepseek-chat",
};

if (typeof window !== "undefined") {
	window.IPC = IPC;
	window.INTENT = INTENT;
	window.MODE = MODE;
	window.ERROR_CODE = ERROR_CODE;
	window.API_CONFIG = API_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = { IPC, INTENT, MODE, ERROR_CODE, API_CONFIG };
}
