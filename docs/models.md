# User

| Name        | Type |               Rules                |
| :---------- | :--- | :--------------------------------: |
| id          | text |    :key: **primary-key**, auto     |
| email       | text | **required-unique**, format: email |
| password    | text |     **required**, length: 8-80     |
| name        | text | **required-unique**, length: 3-30  |
| description | text |           length: 0-100            |
| avatar      | text |            format: url             |
| role        | text |       values: ["", "admin"]        |

# Note

| Name    | Type | Rules                         |
| :------ | :--- | :---------------------------- |
| id      | text | :key: **primary-key**, auto   |
| userId  | text | :key: **foreign-key: user**   |
| title   | text | **required**, length: 3-30    |
| content | text | **required**, length: 10-1000 |
