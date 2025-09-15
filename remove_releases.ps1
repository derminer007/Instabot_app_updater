# Range von 1.0.26 bis 1.0.53
foreach ($i in 26..53) {
    $tag = "v1.0.$i"
    Write-Host "Lösche Release und Tag: $tag"

    # Release löschen (falls vorhanden)
    gh release delete $tag --yes

    # Tag im Remote löschen
    git push origin ":refs/tags/$tag"
}
