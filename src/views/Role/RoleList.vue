<template>
    <div>
        <div style="text-align: right;">
            <el-button @click="dialogFormVisible = true" type="success" size="small">添加</el-button>
        </div>
        <el-table :data="rolelist" border style="width: 100%">
            <el-table-column fixed prop="roleName" label="角色名称"></el-table-column>
            <el-table-column fixed prop="roleName" label="添加日期">
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
    </div>
</template>
<script>
import { GetRoleAll, LogicDeleteAsyncRole } from "@/api/role"
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
            dialogFormVisible: false,
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
            }).catch(err => {
                console.log(err);
            })
        },
        Visible(val) {
            this.dialogFormVisible = val;
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
