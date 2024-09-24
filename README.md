# 프로젝트 소개
이 프로젝트는 [roadmap.hs](https://roadmap.sh/backend/projects)에서 제공하는 과제 중 하나로 CLI기반 간단한 작업 기록 프로그램을 만드는 것입니다. 

# 기능
해당 과제에서 구현한 기능은 아래와 같습니다. <br>
1. 작업을 추가, 수정, 삭제할 수 있습니다.
2. 작업의 상태(status)를 바꿀 수 있습니다.
3. 작업 목록을 불러올 수 있습니다.
4. 특정 상태(status)의 작업 목록을 불러올 수 있습니다.

# 전제조건
해당 프로젝트를 실행하기 위해서는 NodeJS가 설치되어 있어야 합니다.

# 설치
```javascript
git clone https://github.com/wlals7565/task-tracker.git
# 해당 프로젝트 폴더로 이동해주세요.
cd task-tracker
```

# 사용예시
- 작업 추가
```javascript
node taskTracker add example
```
- 작업 삭제
```javascript
node taskTracker delete id
```

- 작업 수정
```javascript
node taskTracker update id example
```

- 작업 상태 변경
```javascript
node taskTracker mark [done | in-progress | todo ]
```

- 작업 목록 보기
```javascript
node taskTracker list
```
- 특정 상태의 작업 목록 보기
```javascript
node taskTracker list [done | in-progress | todo]
```

# 작업 JSON 예시
```javascript
{
  "description":"test",
  "createdAt":"2024-09-24T06:44:26.501Z",
  "updatedAt":"2024-09-24T06:44:26.501Z",
  "status":"todo",
  "id":1
}
```