#!/bin/bash

# Logging functions with emoji prefixes

LOG_LEVEL=${LOG_LEVEL:-info}

# Log level hierarchy (lower numbers = more verbose)
declare -A LOG_LEVELS=(
    ["trace"]=0
    ["debug"]=1
    ["verbose"]=2
    ["info"]=3
    ["success"]=4
    ["notice"]=5
    ["warn"]=6
    ["error"]=7
    ["critical"]=8
    ["fatal"]=9
)

# Function to determine if we should log at the given level
should_log() {
    local message_level="$1"
    local current_level_num="${LOG_LEVELS[$LOG_LEVEL]}"
    local message_level_num="${LOG_LEVELS[$message_level]}"
    
    # If either level is undefined, default to logging
    if [[ -z "$current_level_num" || -z "$message_level_num" ]]; then
        return 0
    fi
    
    # Log if message level is >= current level (less verbose or equal)
    [[ "$message_level_num" -ge "$current_level_num" ]]
}


log_trace() {
    should_log "trace" && echo "🔬 [TRACE] $*"
}

log_debug() {
    should_log "debug" && echo "🔍 [DEBUG] $*"
}

log_verbose() {
    should_log "verbose" && echo "📝 [VERBOSE] $*"
}

log_info() {
    should_log "info" && echo "ℹ️  [INFO] $*"
}

log_success() {
    should_log "success" && echo "✅ [SUCCESS] $*"
}

log_notice() {
    should_log "notice" && echo "💡 [NOTICE] $*"
}

log_warn() {
    should_log "warn" && echo "⚠️  [WARN] $*"
}

log_error() {
    should_log "error" && echo "❌ [ERROR] $*"
}

log_critical() {
    should_log "critical" && echo "🚨 [CRITICAL] $*"
}

log_fatal() {
    should_log "fatal" && echo "☠️  [FATAL] $*"
}
