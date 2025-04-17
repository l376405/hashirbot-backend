# command欄位設計

## 這邊會統整一下市面上的機器人裡面的command都提供了甚麼欄位，以及說明我的機器人想要有甚麼欄位

- 行內說明 ?符號代表不一定需要這個值
- 行內說明 //符號代表註解

### nightbot

- id
- Enabled
- Name
- Response
- UserLevel
- Cooldown
- AliasOf?

### StreamElement

- id
- Enabled
- Name //限制prefix
- Response
- ResponseType
- UserLevel
- Global Cooldown
- User CoolDown
- Aliases?
- Keywords?
- RegEx?

### 我的需求

Command

- id
- Enabled
- Prefix?
- Name
- Response
- ResponseType
- Cooldown
- Aliases?
- Keywords?
- RegEx?

Command_response

- id
- Command_id
- Response
- Platform
- Enabled
- UserLevel
