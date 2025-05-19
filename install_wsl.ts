#!/usr/bin/env -S deno run --allow-all
import { $ } from "jsr:@david/dax";

const USERNAME = "7eleven";
const EMAIL = "194344232+7eleven1717@users.noreply.github.com";

await $`git config --global user.name ${USERNAME}`;
await $`git config --global user.email ${EMAIL}`;

await $`curl https://i.jpillora.com/x-motemen/ghq! | bash`;
await $`curl https://i.jpillora.com/junegunn/fzf! | bash`;
await $`ghq get ${USERNAME}/dotfiles`;

const root = await $`ghq root`.text();
const path = await $`ghq list ${USERNAME}/dotfiles`.text();

await $`cd ${root}/${path}`.exportEnv();
await $`ln -sf $PWD/.bash_aliases ~/.bash_aliases`;

await $`sudo apt-get update`;
await $`sudo apt-get install keychain -y`;
await $`echo "/usr/bin/keychain -q --nogui \\$HOME/.ssh/id_ed25519_${USERNAME}" >> ~/.bashrc`;
await $`echo "source \\$HOME/.keychain/\\$(hostname)-sh" >> ~/.bashrc`;

if (!await $.commandExists("rustc")) {
  $.logLight("Installing Rust...");
  // https://github.com/rust-lang-deprecated/rustup.sh/issues/83#issuecomment-297613830
  await $`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y`;
}

if (!await $.commandExists("mise")) {
  $.logLight("Installing mise...");
  await $`curl https://mise.run | sh`;
  await $`echo 'eval "\$(\$HOME/.local/bin/mise activate bash)"' >> ~/.bashrc`;
}

// bevy
// https://github.com/bevyengine/bevy/blob/latest/docs/linux_dependencies.md#ubuntu
await $`sudo apt-get -y install g++ pkg-config libx11-dev libasound2-dev libudev-dev libxkbcommon-x11-0`;
await $`sudo apt-get -y install libwayland-dev libxkbcommon-dev`;
