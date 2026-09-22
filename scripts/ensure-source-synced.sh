#!/bin/bash

set -euo pipefail

fail() {
  printf '\nNo se puede publicar: %s\n\n' "$1" >&2
  exit 1
}

if [[ -n "$(git status --porcelain --untracked-files=all)" ]]; then
  fail "hay cambios locales sin guardar en Git. Usa ./deploy.sh para guardar, subir y publicar todo en orden."
fi

branch="$(git branch --show-current)"
if [[ -z "$branch" ]]; then
  fail "Git no está ubicado en una rama."
fi

if ! upstream="$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null)"; then
  fail "la rama $branch no tiene una rama remota configurada."
fi

ahead="$(git rev-list --count "$upstream..HEAD")"
behind="$(git rev-list --count "HEAD..$upstream")"

if (( ahead > 0 || behind > 0 )); then
  fail "la fuente local y $upstream no coinciden. Haz push o pull antes de publicar."
fi

printf 'Fuente verificada: %s está limpia y sincronizada con %s.\n' "$branch" "$upstream"
