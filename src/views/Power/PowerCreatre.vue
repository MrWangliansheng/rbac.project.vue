<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="权限名称" prop="powerName">
                        <el-input v-model="ruleForm.powerName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="权限路由" prop="powerRoute">
                        <el-input v-model="ruleForm.powerRoute"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                    <el-form-item label="上级菜单" prop="powerParentId">
                        <el-cascader :options="powerlist" @change="GetValue" :props="{ checkStrictly: true }"
                            clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="类型" prop="powerType">
                        <el-select v-model="ruleForm.powerType" clearable placeholder="请选择类型">
                            <el-option v-for="item in typelist" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24" :offset="0">
                    <el-form-item label="活动形式" prop="powerDesc">
                        <el-input type="textarea" v-model="ruleForm.powerDesc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { GetPowerTree, GetPowerEnum } from '@/api/power';
export default {
    name: 'APP',
    data() {
        return {
            typelist: [],
            powerlist: [],
            ruleForm: {
                powerName: '',
                powerRoute: '',
                powerParentId: '',
                powerType: "",
                powerDesc: "",
                powerParentIdAll: "",
            },
            rules: {
                powerName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                powerRoute: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                powerType: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                powerDesc: [
                    { required: true, message: '请填写菜单描述', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        GetPowerTreeList() {
            GetPowerTree().then(d => {
                console.log(d.data)
                this.powerlist = d.data;
            })
        },
        GetValue(val) {
            console.log(val);
        },
        GetPowerEnumList() {
            GetPowerEnum().then(d => {
                this.typelist = d.data;
            })
        }
    },
    created() {
        this.GetPowerTreeList();
        this.GetPowerEnumList();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
