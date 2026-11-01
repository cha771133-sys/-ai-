# 협업 규칙

## 🌿 브랜치 전략

### 브랜치 구조

```
main      ← 데모·배포용 (항상 동작하는 상태)
 └ dev    ← 개발 통합용 · 저장소 기본 브랜치
    ├ feature/...   기능 개발
    ├ fix/...       버그 수정
    └ docs/...      문서 작업
```

| 브랜치 | 용도 | 직접 push |
| --- | --- | --- |
| `main` | 실제 배포 (데모 주소) | ❌ 금지 — `dev`에서 PR로만 |
| `dev` | 기능 통합·테스트 (테스트 배포 주소), **기본 브랜치** | ❌ 금지 — 작업 브랜치에서 PR로만 |
| `feature/*` | 새 기능 | ⭕ 본인 브랜치만 |
| `fix/*` | 버그 수정 | ⭕ |
| `docs/*` | 문서 수정 | ⭕ |

- 모든 작업 브랜치는 **반드시 `dev`에서 생성**합니다.
- `main`과 `dev`는 삭제하지 않습니다.

### 브랜치 이름 규칙

`종류/영역-작업내용` (소문자, 하이픈 사용)

- 영역: `fe`(프론트), `be`(백엔드), `ai`(AI)
- 이슈 번호를 붙이면 추적이 쉬워요: `feature/be-document-api-12`

| 예시 | 의미 |
| --- | --- |
| `feature/fe-upload-page` | 프론트 업로드 화면 |
| `feature/be-document-api` | 백엔드 문서 업로드 API |
| `feature/ai-ocr-pipeline` | AI OCR 처리 |
| `fix/be-cors-error` | 백엔드 CORS 오류 수정 |
| `docs/readme-setup` | README 실행 방법 정리 |

### 작업 순서

```bash
# 1. dev 최신화
git checkout dev
git pull origin dev

# 2. dev에서 작업 브랜치 생성
git checkout -b feature/be-document-api

# 3. 작업 후 커밋
git add .
git commit -m "feat: 문서 업로드 API 추가"

# 4. push
git push origin feature/be-document-api

# 5. GitHub에서 PR 생성 (대상 브랜치는 기본값인 dev)
```

---

## 🔀 PR 규칙

### 기본 원칙

- **방향:** 작업 브랜치 → `dev` / 데모 전에만 `dev` → `main`
- **크기:** PR 하나에 기능 하나
- **PR 제목:** 커밋 규칙과 같게 작성 (예: `feat: 문서 업로드 API 추가`). Squash merge 시 PR 제목이 그대로 커밋 메시지가 됩니다.

### merge 방식

| PR 방향 | merge 방식 | 이유 |
| --- | --- | --- |
| 작업 브랜치 → `dev` | **Squash and merge** | 기능 하나를 커밋 하나로 정리 |
| `dev` → `main` | **Create a merge commit** | Squash하면 `main`과 `dev` 이력이 어긋나 다음 merge 때 충돌 발생 |

### 머지 담당

- 모든 PR의 merge는 **차성진**이 일괄 진행합니다.
- 머지 담당이 부재 중일 때는 대리인 **TODO: 대리인 지정**이 merge합니다.
- 그 외 팀원은 merge 버튼을 누르지 않습니다.

### 리뷰

- 모든 PR은 작성자가 아닌 팀원 **1명 이상의 리뷰**를 받은 뒤 merge합니다.
- **머지 담당 본인의 PR도** 다른 팀원의 리뷰를 받습니다.
- 리뷰 요청을 받으면 **4시간 안에** 리뷰를 남깁니다. 늦어지면 팀 채팅에 알립니다.

### PR 올릴 때

1. Reviewers에 리뷰할 팀원, Assignees에 본인 지정
2. 템플릿에 관련 이슈를 `close #이슈번호`로 적기 → `dev`에 merge되면 이슈가 자동으로 닫힘
3. 팀 채팅에 PR 링크 공유
4. 충돌이 생기면 **PR 작성자**가 `dev`를 pull 받아 해결한 뒤 다시 push (Django 마이그레이션 충돌은 `python manage.py makemigrations --merge`로 해결)

### PR 템플릿

`.github/pull_request_template.md`에 저장되어 있어 PR을 만들 때 자동으로 채워집니다.

```markdown
## 작업 내용
- 

## 관련 이슈
- close #

## 테스트 방법
- 

## 스크린샷 (화면 작업인 경우)
```

---

## 📝 커밋 메시지 규칙

`타입: 내용`

| 타입 | 용도 | 예시 |
| --- | --- | --- |
| `feat` | 새 기능 | `feat: 체크리스트 생성 API 추가` |
| `fix` | 버그 수정 | `fix: 업로드 용량 제한 오류 수정` |
| `refactor` | 동작 변화 없는 코드 정리 | `refactor: 해석 결과 serializer 분리` |
| `style` | UI 스타일, 코드 포맷 | `style: 결과 화면 여백 조정` |
| `docs` | 문서 | `docs: README 실행 방법 추가` |
| `chore` | 설정, 패키지 | `chore: whitenoise 설치` |
| `test` | 테스트 코드 | `test: 업로드 API 테스트 추가` |

---

## 🔒 보안

- `.env` 파일은 커밋하지 않습니다. 필요한 변수는 값 없이 `.env.example`에만 추가합니다.
