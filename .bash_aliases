# Easier navigation: .., ..., ...., ....., ~ and -
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ~="cd ~" # `cd` is probably faster to type though
alias -- -="cd -"

function gfp!() {
    git add -A
    git commit --amend --no-edit
    git push --force-with-lease origin $(git branch --contains | cut -d ' ' -f 2)
}

function gcd() {
    cd $(ghq root)/$(ghq list | fzf)
}