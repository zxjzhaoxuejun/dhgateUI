# Button
按钮组件
### 示例
#### 文字按钮

<dh-button type="text">默认按钮</dh-button>

#### 不同尺寸

<dh-button size="medium">medium默认按钮</dh-button>
<dh-button size="small">small默认按钮</dh-button>
<dh-button size="mini">mini按钮</dh-button>

#### 圆角按钮
<dh-button size="small" round type="success">圆角按钮</dh-button>
<dh-button size="small" round type="primary" plain>圆角按钮</dh-button>

### 代码
```html
<dh-button type="text">默认按钮</dh-button>
<dh-button size="small">small默认按钮</dh-button>
<dh-button size="small" round>圆角按钮</dh-button>
<dh-button size="small" round type="success">圆角按钮</dh-button>
<dh-button size="small" round type="primary" plain>圆角按钮</dh-button>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---  |  --- | --- |   ---   | --- |
| size | 尺寸 | String | medium / small / mini | - |
| type | 类型 | String | primary / success / warning / danger / info / text | - |
| plain | 是否朴素按钮 | boolean | false/true | false |
| round | 是否圆角按钮 | boolean | false/true | false |
| disabled | 卡是否禁用状态 | boolean | false/true | false |