# Git branching and merge-conflict practical

This project is inside the `Hotel-Booking-Application` folder of the
`ASE-INSEM-LAB` repository. Run Git commands from the repository root.

## Clone and inspect

```bash
git clone https://github.com/karthikeyasure2005-crypto/ASE-INSEM-LAB.git
cd ASE-INSEM-LAB
git status
git branch -a
```

Open `Hotel-Booking-Application/index.html` in a browser to run the demo.

## Branch workflow

Use `main` for the stable version and `develop` for integration. Create each
feature branch from `develop`:

```bash
git switch main
git switch -c develop
git switch -c feature/room-search
# Make and commit the room-search changes.
git switch develop
git switch -c feature/booking
# Make and commit the booking changes.
```

Merge each completed feature into `develop`:

```bash
git switch develop
git merge --no-ff feature/room-search
git merge --no-ff feature/booking
```

## Demonstrate and resolve a conflict

For a genuine README conflict, start both feature branches at the same
`develop` commit and independently replace the same original README heading
with different text. Commit each edit. Merge one branch into `develop`, then
merge the other. Git will report a content conflict because both commits
changed the same line.

Inspect the conflicted file and preserve both descriptions while removing the
`<<<<<<<`, `=======`, and `>>>>>>>` markers. Then finish the merge:

```bash
git add Hotel-Booking-Application/README.md
git commit -m "Resolve merge conflict between room search and booking"
```

The completed practical in this repository follows that workflow. To repeat
the demonstration, use fresh branches from a common commit rather than
rewriting the completed feature history.

## Verify and publish

```bash
git status
git branch -a
git log --oneline --graph --all
git push -u origin develop
git push -u origin main
```

Push feature branches with their upstreams as well when publishing the
exercise. Never force-push to resolve a conflict.

## Booking demo limitation

Room search filters sample data and validates dates; it does not check live
availability. The booking form displays a confirmation in the browser only.
There is no backend or database, and no real reservation is made.
