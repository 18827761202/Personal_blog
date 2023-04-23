CREATE TABLE `admin_user`  (
  `user_guid` char(36) NOT NULL COMMENT '用户id',
  `user_name` varchar(50) NULL COMMENT '用户名',
  `user_pswd` varchar(255) NULL COMMENT '用户密码',
  `nick_name` varchar(120) NULL COMMENT '昵称',
  `avatar` varchar(255) NULL COMMENT '头像',
  `contact_number` varchar(11) NULL COMMENT '联系电话',
  `signature` varchar(510) NULL COMMENT '签名',
  `last_time` datetime(0) NULL COMMENT '最近修改信息的时间',
  PRIMARY KEY (`user_guid`)
) COMMENT = '后台用户';

CREATE TABLE `article`  (
  `article_guid` char(36) NOT NULL COMMENT '文章id',
  `title` varchar(255) NULL COMMENT '标题',
  `content` text NULL COMMENT '内容',
  `like_number` int(11) NULL COMMENT '点赞数',
  `view_number` int(11) NULL COMMENT '浏览量',
  `create_time` datetime(0) NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL COMMENT '修改时间',
  PRIMARY KEY (`article_guid`)
) COMMENT = '文章';

CREATE TABLE `article_category`  (
  `article_category_guid` char(36) NOT NULL COMMENT '文章分类id',
  `article_guid` char(36) NULL COMMENT '文章id',
  `category_guid` char(36) NULL COMMENT '分类id',
  `create_time` datetime(0) NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL COMMENT '修改时间',
  PRIMARY KEY (`article_category_guid`)
) COMMENT = '文章分类';

CREATE TABLE `category`  (
  `category_guid` char(36) NOT NULL COMMENT '分类id',
  `name` varchar(255) NULL COMMENT '分类名称',
  `create_time` datetime(0) NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL COMMENT '修改时间',
  PRIMARY KEY (`category_guid`)
) COMMENT = '分类';

CREATE TABLE `comments`  (
  `comments_guid` char(36) NOT NULL COMMENT '评论id',
  `parent_comments_guid` char(36) NULL COMMENT '父级评论id',
  `article_guid` char(36) NULL COMMENT '文章id',
  `content` text NULL COMMENT '内容',
  `content_ip` varchar(255) NULL COMMENT '评论者ip',
  `create_time` datetime(0) NULL COMMENT '评论时间',
  PRIMARY KEY (`comments_guid`)
) COMMENT = '评论表';

