<template>
    <div style="position: fixed; display: flex; width: 100%; height: 100%">
        <el-container style="height: 100%; border: 1px solid #eee">
            <div style="height: 100%;; border: 1px solid #eee">
                <div style=" height:5%;">
                    管理系统
                </div>
                <el-aside height="95%" width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu @open="handleOpen" @close="handleClose" @select="handleSelect" style="text-align: left">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>用户管理</span>
                            </template>
                            <el-submenu index="1-1">
                                <template slot="title">
                                    <i class="el-icon-s-custom"></i><span>用户信息</span></template>
                                <el-menu-item index="/UserCreate">用户注册</el-menu-item>
                                <el-menu-item index="/UserList">用户列表</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-data"></i>
                                <span>用户数据统计</span>
                            </template>
                            <el-submenu index="2-1">
                                <template slot="title">
                                    <i class="el-icon-s-custom"></i><span>用户信息</span></template>
                                <el-menu-item index="/logincount">用户登录统计</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-goods"></i>
                                <span>商品管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-s-order"></i>
                                <span>订单管理</span>
                            </template>
                            <el-submenu index="5-1">
                                <template slot="title">
                                    <i class="el-icon-mobile"></i><span>订单</span></template>
                                <el-menu-item index="/OrderList">订单列表</el-menu-item>
                                <el-menu-item index="/OrderListTwo">订单列表2</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>个人中心</span>
                            </template>
                            <el-menu-item index="/UserPerfect">信息完善</el-menu-item>
                            <!-- <el-submenu index="1-1">
                            <template slot="title"> <i class="el-icon-location"></i><span>信息完善</span></template>
                            <el-menu-item index="/LoginCount">用户登录统计</el-menu-item>

                        </el-submenu> -->
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div>
            <el-container>
                <el-header style="text-align: right; font-size: 12px" width="100%">
                    <el-menu round class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item index="1">处理中心</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">我的工作台</template>
                        </el-submenu>
                        <el-menu-item index="3" disabled>消息中心</el-menu-item>
                        <el-menu-item index="4">订单管理</el-menu-item>

                        <div class="block">
                            <el-badge :value="12" class="item" style="margin-right: 40px">
                                <i class="el-icon-message" style="font-size: 30px"></i>
                            </el-badge>
                            <el-dropdown>
                                <el-avatar style="margin-top: 10px; margin-right: 10px" :size="40"
                                    src="http://localhost:64812/img/bbe98a4b-4523-420c-bb8a-54dcf6a516f7.jpeg"></el-avatar>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>查看</el-dropdown-item>
                                    <el-dropdown-item>新增</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-menu>
                </el-header>

                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import { RouterView } from "vue-router";
export default {
    name: 'APP',
    data() {
        return {
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.show = false;
            this.$router.push({
                path: key,
            });
        },
    },
    created() {
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
