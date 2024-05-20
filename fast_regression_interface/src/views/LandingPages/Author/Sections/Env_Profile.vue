
<script setup>
    import { ref, computed, onMounted } from "vue";
    import { useRoute, useRouter } from 'vue-router';
    import { useLoading } from 'vue-loading-overlay'
    import axios from 'axios'; // import backend parameters

    //Vue Material Kit 2 components
    import MaterialAvatar from "@/components/MaterialAvatar.vue";
    import MaterialButton from "@/components/MaterialButton.vue";
    import MaterialSwitch from '@/components/MaterialSwitch.vue';


    // image
    import profilePic from "@/assets/img/fast_bird_profile.png";

    // material-input
    import setMaterialInput from "@/assets/js/material-input";
    onMounted(() => {
        setMaterialInput();
    });

    const isClicked = ref(false);
    const errorMessage = ref('');
    const retryCount = ref(0);
    const route = useRoute();
    const router = useRouter();


    const isLoading = ref(false);
    const fullPage = ref(true)
    const onCancel = ref(false)
    const formContainer = ref(null)

    const selectedAttCOM = ref([]);
    const iologik_ipAddress = ref('');
    const local_ipAddress = ref('');
    const local_port = ref('');
    const remote_ipAddress = ref('');
    const remote_port = ref('');
    const icmp_targetip = ref('');
    const icmp_srcip = ref('');
    const icmp_ingore_timeout = ref('');
    const icmp_interval = ref('');
    const icmp_length = ref('');
    const icmp_timeout = ref('');
    const iperf_localip = ref('');
    const iperf_remoteip = ref('');
    const iperf_port = ref('');
    const iperf_duration = ref('');
    const iperf_traffic = ref('');
    const iperf_direction = ref('');
    const iperf_tcp_buffer_len = ref('');
    const iperf_pairs = ref('');
    const iperf_udp_throughput = ref('');
    const iperf_udp_pkt_size = ref('');
    const att_start = ref('');
    const att_step = ref('');
    const att_stop = ref('');
    const radius_ip = ref('');
    const radius_username = ref('');
    const radius_password = ref('');
    const radius_sharedkey = ref('');
    const dont_change_config = ref(null);
    const dont_change_network = ref(null);
    const dont_reset_default = ref(true);
    const testcase_stop = ref(null);





    const $loading = useLoading({
        // options
    })

    onMounted(async () => {
    });
    const handleChange = (newValue) => {
        dont_change_config.value = newValue ? 'enable' : 'disable';
    }
    const handleresetdefault = (newValue) => {
        dont_reset_default.value = newValue;
    }
    const handleTestcasestop = (newValue) => {
        testcase_stop.value = newValue ? 'enable' : 'disable';
    }
    const handleNetwork = (newValue) => {
        dont_change_network.value = newValue ? 'enable' : 'disable';
    }
    const handleChannel_24Gand5G = () => {
        console.log(selectedAttCOM);
    }
    const fillPlaceholders = () => {

        if (!iologik_ipAddress.value) {
            iologik_ipAddress.value = '192.168.128.101';
        }

        if (!local_ipAddress.value) {
            local_ipAddress.value = '192.168.128.200';
        }

        if (!local_port.value) {
            local_port.value = '11112';
        }

        if (!remote_ipAddress.value) {
            remote_ipAddress.value = '192.168.128.100';
        }

        if (!remote_port.value) {
            remote_port.value = '11111';
        }

        if (!icmp_targetip.value) {
            icmp_targetip.value = '192.168.127.100';

        }

        if (!icmp_srcip.value) {

            icmp_srcip.value = 'Auto';
        }

        if (!icmp_ingore_timeout.value) {
            icmp_ingore_timeout.value = '200';
        }

        if (!icmp_interval.value) {
            icmp_interval.value = '2';
        }

        if (!icmp_length.value) {
            icmp_length.value = '64';
        }

        if (!icmp_timeout.value) {
            icmp_timeout.value = '200';
        }

        if (!iperf_localip.value) {
            iperf_localip.value = '192.168.127.200';
        }

        if (!iperf_remoteip.value) {
            iperf_remoteip.value = '192.168.127.100';
        }

        if (!iperf_port.value) {
            iperf_port.value = '11113';
        }

        if (!iperf_duration.value) {
            iperf_duration.value = '30';
        }

        if (!iperf_traffic.value) {
            iperf_traffic.value = 'UDP';
        }

        if (!iperf_direction.value) {
            iperf_direction.value = 'All';
        }

        if (!iperf_tcp_buffer_len.value) {
            iperf_tcp_buffer_len.value = '32';
        }

        if (!iperf_pairs.value) {
            iperf_pairs.value = '4';
        }

        if (!iperf_udp_throughput.value) {
            iperf_udp_throughput.value = '1201';
        }

        if (!iperf_udp_pkt_size.value) {
            iperf_udp_pkt_size.value = '1470';
        }

        if (!att_start.value) {
            att_start.value = '0';
        }

        if (!att_step.value) {
            att_step.value = '5';
        }

        if (!att_stop.value) {
            att_stop.value = '45';
        }

        if (!radius_ip.value) {
            radius_ip.value = '192.168.127.10';
        }

        if (!radius_username.value) {
            radius_username.value = 'User1';
        }

        if (!radius_password.value) {
            radius_password.value = '12345678';
        }

        if (!radius_sharedkey.value) {
            radius_sharedkey.value = '12345678';
        }



    }
    const handleSave = async () => {
        const data = {
            iologik_ipAddress: iologik_ipAddress.value,
            local_ipAddress: local_ipAddress.value,
            local_port: local_port.value,
            remote_ipAddress: remote_ipAddress.value,
            remote_port: remote_port.value,
            icmp_targetip: icmp_targetip.value,
            icmp_srcip: icmp_srcip.value,
            icmp_ingore_timeout: icmp_ingore_timeout.value,
            icmp_interval: icmp_interval.value,
            icmp_length: icmp_length.value,
            icmp_timeout: icmp_timeout.value,
            iperf_localip: iperf_localip.value,
            iperf_remoteip: iperf_remoteip.value,
            iperf_port: iperf_port.value,
            iperf_duration: iperf_duration.value,
            iperf_traffic: iperf_traffic.value,
            iperf_direction: iperf_direction.value,
            iperf_tcp_buffer_len: iperf_tcp_buffer_len.value,
            iperf_pairs: iperf_pairs.value,
            iperf_udp_throughput: iperf_udp_throughput.value,
            iperf_udp_pkt_size: iperf_udp_pkt_size.value,
            att_start: att_start.value,
            att_step: att_step.value,
            att_stop: att_stop.value,
            radius_ip: radius_ip.value,
            radius_username: radius_username.value,
            radius_password: radius_password.value,
            radius_sharedkey: radius_sharedkey.value,
            dont_change_config: dont_change_config.value
        }
        console.log(data);
        try {
            $loading.show();
            const response = await axios.post('http://localhost:3000/api/env_profile', data);
            console.log(response);
            $loading.hide();
        } catch (error) {
            console.log(error);
            $loading.hide();
        }
    }

</script>


<template>
    <section class="py-sm-7 py-5 position-relative">
        <div class="container">
            <div class="row">
                <div class="col-12 mx-auto">
                    <div class="mt-n8 mt-md-n9 text-center">
                        <div class="blur-shadow-avatar">
                            <MaterialAvatar size="xxl"
                                            class="shadow-xl position-relative z-index-2"
                                            :image="profilePic"
                                            alt="Avatar" />
                        </div>
                    </div>
                    <div class="row py-7">
                        <div class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto">
                            <div v-if="errorMessage" class="error-message">
                                <h2 class="mb-3" style="color: red">{{ errorMessage }}</h2>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-6">
                                <h3 class="mb-0">Environment Setting:</h3>
                                <button class="btn btn-lg bg-gradient-info" @click="fillPlaceholders">Quick Setup</button>

                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-14 d-flex align-items-center mb-6">
                                        <label class="h3">I/O logik IP:</label>
                                        <el-input placeholder="Ex: 192.168.128.101" v-model="iologik_ipAddress" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        <div v-show="iologik_ipAddress.length > 0">
                                            <div class="ms-2">
                                                <MaterialButton class="text-nowrap mb-0"
                                                                :variant="isClicked ? 'grey' : 'outline'"
                                                                color="success"
                                                                size="sm"
                                                                @click="handleIOlogik">
                                                    Apply
                                                </MaterialButton>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Config Settings-->
                                    <div class="col-14 d-flex align-items-center mb-6">
                                        <label class="h3"><span style="color: red;">Don't </span> Change Config:</label>
                                        <material-switch class="ms-5" @change="handleChange"></material-switch>
                                    </div>
                                    <div class="col-14 d-flex align-items-center mb-6">
                                        <label class="h3"><span style="color: red;">Don't </span> Change DUT Network:</label>
                                        <material-switch class="ms-5" @change="handleNetwork"></material-switch>
                                    </div>
                                    <div class="col-14 d-flex align-items-center mb-6">
                                        <label class="h3">DUT Reset To Default:</label>
                                        <material-switch id="reset_default" v-model="dont_reset_default" value='enabled' class="ms-5" @change="handleresetdefault"></material-switch>
                                    </div>
                                    <div class="col-14 d-flex align-items-center mb-6">
                                        <label class="h3">Testcase Stop:</label>
                                        <material-switch class="ms-5" @change="handleTestcasestop"></material-switch>
                                    </div>
                                    <div class="control-socket-container mb-5">
                                        <!--Attenuator Settings-->
                                        <label class="h3">Attenuator Setting:</label>
                                        <hr class="visible-hr">
                                        <!--Att Comport-->
                                        <div class="col-14 d-flex align-items-center ms-4">
                                            <label class="h4">Attenuator COM:</label>
                                            <el-select v-model="selectedAttCOM" multiple placeholder="Select Comports" class="ms-2 mb-2" style="padding: 2%; width: 35%;">
                                                <el-option v-for="attcom in 200"
                                                           :key="attcom"
                                                           :label="attcom"
                                                           :value="attcom">
                                                </el-option>
                                            </el-select>

                                            <div v-show="selectedAttCOM.length > 0">
                                                <div class="ms-2">
                                                    <MaterialButton class="text-nowrap mb-0"
                                                                    :variant="isClicked ? 'grey' : 'outline'"
                                                                    color="success"
                                                                    size="sm"
                                                                    @click="handleChannel_24Gand5G">
                                                        Apply
                                                    </MaterialButton>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Start Att  Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Start Attenuation:</label>
                                            <el-input placeholder="Ex: 0" v-model="att_start" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Step Att Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Step Attenuation:</label>
                                            <el-input placeholder="Ex: 5" v-model="att_step" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Stop Att Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Stop Attenuation:</label>
                                            <el-input placeholder="Ex: 45" v-model="att_stop" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                    </div>
                                    <!--Control Socket-->
                                    <div class="control-socket-container mb-5">
                                        <label class="h3">Control Socket:</label>
                                        <hr class="visible-hr">
                                        <!-- Local IP Field -->
                                        <div class="md-layout-item ms-4 ">
                                            <label class="h4 me-2 mb-3">Local IP:</label>
                                            <el-input placeholder="Ex: 192.168.128.200" v-model="local_ipAddress" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>

                                        <!-- Local Port Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Local Port:</label>
                                            <el-input placeholder="Ex: 11112" v-model="local_port" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>

                                        <!-- Remote IP Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Remote IP:</label>
                                            <el-input placeholder="Ex: 192.168.128.100" v-model="remote_ipAddress" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>

                                        <!-- Remote Port Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Remote Port:</label>
                                            <el-input placeholder="Ex: 11111" v-model="remote_port" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                    </div>
                                    <!--ICMP Socket-->
                                    <div class="control-socket-container mb-5">
                                        <label class="h3">ICMP Socket:</label>
                                        <hr class="visible-hr">
                                        <!-- Target IP  Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Target IP:</label>
                                            <el-input placeholder="Ex: 192.168.127.100" v-model="icmp_targetip" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- Src IP Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Src IP:</label>
                                            <el-input placeholder="Ex: Auto/'IP address'" v-model="icmp_srcip" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- Ignore Timeout Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Ignore timeout(ms):</label>
                                            <el-input placeholder="?" v-model="icmp_ingore_timeout" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Interval Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Interval(ms):</label>
                                            <el-input placeholder="Ex: 2" v-model="icmp_interval" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Length Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Length(bytes):</label>
                                            <el-input placeholder="Ex: 64" v-model="icmp_length" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Timeout Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Timeout(ms):</label>
                                            <el-input placeholder="Ex: 200" v-model="icmp_timeout" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                    </div>
                                    <!--Iperf Socket-->
                                    <div class="control-socket-container mb-5">
                                        <label class="h3">Iperf Socket:</label>
                                        <hr class="visible-hr">
                                        <!-- Local IP Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Local IP:</label>
                                            <el-input placeholder="Ex: 192.168.127.200" v-model="iperf_localip" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- Remote IP Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Remote IP:</label>
                                            <el-input placeholder="Ex: 192.168.127.100" v-model="iperf_remoteip" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- Port Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Iperf port:</label>
                                            <el-input placeholder="Ex: 11113" v-model="iperf_port" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Duration Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Duration(s):</label>
                                            <el-input placeholder="Ex: 30" v-model="iperf_duration" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Traffic_type Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Traffic type:</label>
                                            <el-input placeholder="Ex: UDP/TCP/Multicast" v-model="iperf_traffic" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- Direction Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Direction:</label>
                                            <el-input placeholder="Ex: Download/upload/All" v-model="iperf_direction" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- TCP buffer length Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">TCP buffer length(k):</label>
                                            <el-input placeholder="Ex: 32" v-model="iperf_tcp_buffer_len" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Iperf pairs Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Iperf pairs:</label>
                                            <el-input placeholder="Ex: 4" v-model="iperf_pairs" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- UDP throughput Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">UDP throughput (Mbps)</label>
                                            <el-input placeholder="Ex: 1201" v-model="iperf_udp_throughput" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- UDP packets size Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">UDP packets size:</label>
                                            <el-input placeholder="Ex: 1470" v-model="iperf_udp_pkt_size" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                    </div>

                                    <!--Radius Server-->
                                    <div class="control-socket-container mb-5">
                                        <label class="h3">Radius Server:</label>
                                        <hr class="visible-hr">
                                        <!-- Radius IP Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Radius IP:</label>
                                            <el-input placeholder="Ex: 192.168.127.10" v-model="radius_ip" class="ms-4 mb-2" style="width: 50%;"></el-input>
                                        </div>
                                        <!-- User Name Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">User name:</label>
                                            <el-input placeholder="Ex: User1" v-model="radius_username" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Password Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Password :</label>
                                            <el-input placeholder="Ex: 12345678" v-model="radius_password" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                        <!-- Shared Key Field -->
                                        <div class="md-layout-item ms-4">
                                            <label class="h4 me-2 mb-3">Shared key:</label>
                                            <el-input placeholder="12345678" v-model="radius_sharedkey" class="ms-4 mb-2" style="width: 15%;"></el-input>
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    .visible-hr {
        border: none;
        border-top: 2px solid #669999;
        margin: 20px 4;
    }

    .control-socket-container {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        background-color: #f8f9fa;
    }
</style>
