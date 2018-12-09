{spawn} = require 'child_process'

module.exports = (api) ->
    repl = (require 'repl').start 'f3 > '
    repl.context.api = api
    repl.defineCommand 'sh' help: 'Execute shell command' action: (arg) ->
        tokens = arg .replace /\s+/g, " " .split ' '
        cmd = tokens.shift 1
        opts = if tokens.length then [ tokens.join ' ' ] else []
        child = spawn cmd, opts, shell: true stdio: 'inherit' 
        clear = (code) ~> @clearBufferedCommand(); @displayPrompt()
        <[ exit error ]> .map (ev) -> child.on ev, clear