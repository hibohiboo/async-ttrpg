```
hibo@DESKTOP-UVNKAM1:/mnt/d/projects/Yakumi$  ls -l /usr/local/lib/docker/cli-plugins/
total 40
lrwxrwxrwx 1 root root 80 Jul 29 09:35 docker-buildx -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-buildx
lrwxrwxrwx 1 root root 81 Jul 29 09:35 docker-compose -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-compose
lrwxrwxrwx 1 root root 79 Jul 29 09:35 docker-debug -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-debug
lrwxrwxrwx 1 root root 77 Jul 29 09:35 docker-dev -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-dev
lrwxrwxrwx 1 root root 83 Jul 29 09:35 docker-extension -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-extension
lrwxrwxrwx 1 root root 82 Jul 29 09:35 docker-feedback -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-feedback
lrwxrwxrwx 1 root root 78 Jul 29 09:35 docker-init -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-init
lrwxrwxrwx 1 root root 78 Jul 29 09:35 docker-sbom -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-sbom
lrwxrwxrwx 1 root root 78 Dec 11  2023 docker-scan -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-scan
lrwxrwxrwx 1 root root 79 Jul 29 09:35 docker-scout -> /mnt/wsl/docker-desktop/cli-tools/usr/local/lib/docker/cli-plugins/docker-scout
```

シンボリックリンクも削除

https://zenn.dev/23prime/articles/c78c42351a7439

いれなおしてみたけどあまり変化なかった。

けっきょく、dockerの書きかたがまずかった模様。下記の記法で解決

Docker & Microsoft SQL Server(初期データ登録まで)
https://qiita.com/75ks/items/b156905968535e23278c