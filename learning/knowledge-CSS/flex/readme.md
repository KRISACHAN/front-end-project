

# flex 属性

## 浏览器支持

1. -webkit-  ( chrome 21.0,  saferi  6.1 )
2. -ms-  ( IE10.0 )
3. -moz-  ( firefox 18.0 )

## 方向

1. X轴 :  row | row-reverse; 开始: start , 结束: end
2. Y轴 :  column | column-reverse; 开始: start , 结束: end

## 语法

### 父级

#### 1. disaplay

display属性定义了一个弹性盒子容器

```
.box {
    display: flex;
}
```

定义行内容器的flex布局

```
.box {
    display:inline-flex;
}
```

#### 2. flex-direction

flex-direction定义主轴的方向。X轴正反方向，Y轴正反方向

```
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

#### 3. flex-wrap

flex-wrap定义flex项目是否换行显示。默认，换行正方向，反方向。

```
.box {
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

#### 4. flex-flow

flex-flow是flex-direction和flex-wrap的合并写法，默认值为row nowarp

```
.box {
    flex-flow: <‘flex-direction’> || <‘flex-wrap’>;
}
```

#### 5. justify-content

justify-content定义了项目在主轴上的对齐方式( justify-content只会在主轴项目仍具有剩余空间时才会起作用 )

```
.box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

#### 6. align-items

align-items定义了项目在交叉轴上的对齐方式。

```
.box {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

#### 7. align-content

align-content定义多根平行轴线的对齐方式

```
.box {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### 子级

#### 1. order

order定义项目在主轴上的排列顺序。数值越小，排列越靠前，默认值为0。

```
.item {
    order: <integer>;
}
```

#### 2. flex-grow

flex-grow定义了项目的放大比例，负值对该属性无效。

```
.item {
    flex-grow: <number>; /* default 0 */
}
```

#### 3. flex-shrink

flex-shrink定义了项目的缩小比例。其默认值为1 ，负值对该属性不起作用。

```
.item {
    flex-shrink: <number>; /* default 1 */
}
```


#### 4. flex-basis

flex-basis定义了在分配多余空间之前，项目占据的主轴空间。

```
.item {
    flex-basis: <length> | auto; /* default auto */
}
```

#### 5. flex

flex是flex-grow、flex-shrink和flex-basis的简写，默认值为0 1 auto。

```
.item {
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

#### 6. align-self

align-self定义了单个项目上在交叉轴的对齐方式。 其默认值为继承容器的align-items属性。

```
.item {
    align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```









