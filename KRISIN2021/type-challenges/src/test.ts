enum TargetTypeEnum {
    ios = '苹果',
    android = '安卓',
    all = '所有用户',
    user_ids = '指定用户',
}

type TargetType = keyof typeof TargetTypeEnum;