<template>
    <div>
        <el-button @click="dialogFormVisible = true" size="small">添加</el-button>
        <el-table :data="rolelist" border style="width: 100%">
            <el-table-column fixed prop="roleName" label="角色名称"></el-table-column>
            <el-table-column fixed prop="roleName" label="角色名称">
                <template slot-scope="scope">
                    {{ scope.row.roleCreateTime.replace("T", " ") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="DeleteRole(scope.row.roleId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-dialog title="添加角色信息" :visible.sync="dialogFormVisible" :modal="false">
                <RoleCreate :key="new Date().getTime()" @dialogFormVisible="Visible"></RoleCreate>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { GetRoleAll } from "@/api/role"
import RoleCreate from "@/views/Role/RoleCreate.vue"
export default {
    components: {
        RoleCreate
    },
    name: 'APP',
    data() {
        return {
            roleid: "",
            rolelist: [],
            dialogFormVisible: false
        }
    },
    methods: {
        GetRole() {
            GetRoleAll().then(d => {
                this.rolelist = d.data;
            })
        },
        Visible(val) {
            this.dialogFormVisible = val;
            location.reload();
        },
        DeleteRole(id) {

        }
    },
    created() {
        this.GetRole();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
