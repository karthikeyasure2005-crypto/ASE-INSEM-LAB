# Git Branching and Merge Conflict Practical

Repository: `Hotel-Booking-Application`

## 1. Clone
```bash
git clone https://github.com/YOUR-USERNAME/Hotel-Booking-Application.git
cd Hotel-Booking-Application
```

If the GitHub repository is empty, copy these project files into the cloned folder, then:
```bash
git add .
git commit -m "Add hotel booking starter application"
git push -u origin main
```

## 2. Create develop
```bash
git switch main
git switch -c develop
git push -u origin develop
```

## 3. Create feature branches from develop
```bash
git switch develop
git switch -c feature/room-search
```
Make a change to `README.md` or `script.js`, then:
```bash
git add .
git commit -m "Add room search feature"
git push -u origin feature/room-search
```

Create the second branch:
```bash
git switch develop
git switch -c feature/booking
```
Make a booking-related change, then:
```bash
git add .
git commit -m "Add booking feature"
git push -u origin feature/booking
```

## 4. Merge features into develop
```bash
git switch develop
git merge feature/room-search
git merge feature/booking
git push origin develop
```

## 5. Demonstrate a conflict safely
Both feature branches must start from the same base commit and edit the same lines in the same file differently. For example, edit the same heading in `README.md` in each feature branch, commit both edits, and then merge one branch into `develop` followed by the other. Git should mark the conflicting lines with `<<<<<<<`, `=======`, and `>>>>>>>`.

Resolve the file by keeping both features and deleting all conflict markers. Then:
```bash
git add README.md
git commit -m "Resolve merge conflict"
git push origin develop
```

If `develop` already contains a feature branch's changes, create fresh conflict-demo branches from a common commit or use a separate file for the exercise.

## 6. Merge develop into main
```bash
git switch main
git merge develop
git push origin main
```

## 7. Verify
```bash
git branch -a
git log --oneline --graph --all
```

Note: This is a front-end demonstration only. Booking requests are not sent to a server and no database is configured.
