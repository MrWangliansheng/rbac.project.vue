<template>
    <div>
        <div style="text-align: right;">
            <el-button v-for="item in buttonlist" v-if="item.powerName == '添加角色'" @click="dialogFormVisible = true"
                type="success" size="small">添加</el-button>
        </div>
        <el-table :data="rolelist" border style="width: 100%">
            <el-table-column fixed prop="roleName" label="角色名称"></el-table-column>
            <el-table-column fixed prop="mesgCreateUser" label="创建人"></el-table-column>
            <el-table-column fixed prop="msgCreateTime" label="添加日期">
                <template slot-scope="scope">
                    <span v-if="scope.row.msgCreateTime != null">{{ scope.row.msgCreateTime.replace("T", " ") }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed prop="msgUpdateUser" label="修改人"></el-table-column>
            <el-table-column fixed prop="megUpdateTipme" label="修改日期">
                <template slot-scope="scope">
                    <span v-if="scope.row.megUpdateTipme != null">{{ scope.row.megUpdateTipme.replace("T", " ") }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <span v-for="item in buttonlist">
                            <el-button type="text" v-if="item.powerName == '分配权限'" size="small"
                                @click="roleid = scope.row.roleId, Privileges = true"
                                style="color: darkorange;">分配权限</el-button>
                            <el-button type="text" v-if="item.powerName == '角色删除'" size="small"
                                @click="DeleteRole(scope.row.roleId)">删除</el-button>
                            <el-button type="text" v-if="item.powerName == '角色编辑'" size="small"
                                @click="roleid = scope.row.roleId, EditVisible = true"
                                style="color:rgb(135, 32, 187)">编辑</el-button>
                        </span>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">...</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin: 0 auto;width: 500px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.pageindex" :page-sizes="[2, 4, 6, 8]" :page-size="page.pagesize"
                layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
        <div>
            <el-dialog title="添加角色信息" :visible.sync="dialogFormVisible" :modal="false">
                <RoleCreate :key="new Date().getTime()" @dialogFormVisible="Visible"></RoleCreate>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="修改角色信息" :visible.sync="EditVisible" :modal="false">
                <RoleEdit :key="new Date().getTime()" :id="roleid" @dialogFormVisible="Visible"></RoleEdit>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="分配权限" :visible.sync="Privileges" :modal="false">
                <RolePrivileges :key="new Date().getTime()" :id="roleid" @dialogFormVisible="Visible"></RolePrivileges>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { GetRoleAll, LogicDeleteAsyncRole, GetRolePowerButton } from "@/api/role"
import RoleCreate from "@/views/Role/RoleCreate.vue"
import RoleEdit from "@/views/Role/RoleEdit.vue"
import RolePrivileges from "./RolePrivileges.vue"
export default {
    components: {
        RoleCreate,
        RoleEdit,
        RolePrivileges
    },
    name: 'APP',
    data() {
        return {
            dialogFormVisible: false,
            EditVisible: false,
            Privileges: false,
            roleid: "",
            rolelist: [],
            buttonlist: [],
            page: {
                pageindex: 1,
                pagesize: 6,
                total: 0,
                pagecount: 0,
            }
        }
    },
    methods: {
        GetRole() {
            GetRoleAll(Object.assign({}, this.page)).then(d => {
                this.rolelist = d.data;
                this.page.total = d.total;
                this.show = false;
            }).catch(err => {
                console.log(err);
            })
        },
        Visible(val) {
            this.dialogFormVisible = val;
            this.EditVisible = val;
            location.reload();
        },
        DeleteRole(id) {
            LogicDeleteAsyncRole(id).then(d => {
                if (d.result == 200) {
                    this.$message.success(d.message);
                    this.GetRole();
                } else if (d.result == 100) {
                    this.$message.warning(d.message);
                } else {
                    this.$message.error(d.message);
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page.pagesize = val;
            this.GetRole();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page.pageindex = val;
            this.GetRole();
        },
        GetRolePowerButton() {
            GetRolePowerButton({
                id: Number(this.$ls.get("UserId")),
                state: 3
            }).then(d => {
                this.buttonlist = d.data;
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created() {
        this.GetRolePowerButton();
        this.GetRole();
    },
    mounted() {

    },
}
</script>
<style>
.el-dialog {
    height: 500px;
}
</style>
