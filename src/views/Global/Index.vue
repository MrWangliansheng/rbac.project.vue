<template>
    <div style="position: fixed; display: flex; width: 100%; height: 100%">
        <el-container>
            <el-header>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div style="text-align: left;">
                            <span><b>权限管理系统</b></span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="block" style="text-align: right;">
                            <el-badge :value="12" class="item" style="margin-right: 40px">
                                <i class="el-icon-message" style="font-size: 30px"></i>
                            </el-badge>
                            <el-dropdown class="block" style="text-align: right;" @command="logout">
                                <i class="el-icon-setting" style="font-size: 30px"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown>
                                <el-avatar style="margin-top: 10px; margin-right: 10px" :size="40"
                                    :src="'http://localhost:5000/img/' + img"></el-avatar>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>查看</el-dropdown-item>
                                    <el-dropdown-item>新增</el-dropdown-item>
                                    <el-dropdown-item>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-header>


            <el-container>
                <el-aside style="width: 200px;">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        @select="handleSelect" active-text-color="#ffd04b">
                        <el-submenu v-for="item in powerlist" :key="item.powerId" :index="item.powerRoute">
                            <template slot="title">
                                <i :class="item.powerIcon"></i>
                                <span>{{ item.powerName }}</span>
                            </template>
                            <el-menu-item v-for="route in item.children" :key="route.powerId" :index="route.powerRoute">
                                <i :class="route.powerIcon"></i>{{ route.powerName }}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <div style=" width: calc(100% - 200px); height: 100%;">
                    <router-view></router-view>
                </div>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import { RouterView } from "vue-router";
import jwt_decode from "jwt-decode";
import { GetRolePower } from "@/api/role"
export default {
    name: "APP",
    data() {
        return {
            url: "",
            log: 0,
            img: "",
            powerlist: [],
        };

    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            this.show = false;
            // console.log(this.$router)
            if (this.url == key) {
                return;
            }
            this.url = key;
            this.$router.push({
                path: key,
            });
        },
        logout() {
            this.$ls.remove("token");
            location.reload();
        },
        GetRolePower(id) {
            GetRolePower().then(d => {
                this.powerlist = d.data;
                this.$ls.set("button", this.powerlist)
            }).catch(err => {
                console.log(err);
            })
        },

    },
    created() {
        this.url = this.$route.fullPath;
        const token = this.$ls.get("token");
        const decode = jwt_decode(token.replace("Bearer ", "")); // 解析
        this.GetRolePower(decode.id);
        this.img = decode.profile;
        this.$ls.set("UserId", decode.id);
    },
    mounted() {
    },
    watch: {

    }
}
</script>
<style>
.el-header,
.el-footer {
    background-color: #09ede6;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    text-align: left;
}

.el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}


.el-menu-demo {
    width: 100%;
}

.el-menu {
    border: none;
}
</style>
