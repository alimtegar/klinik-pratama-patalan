import React from 'react';

const Dashboard = () => {
    return (
        <section id="dashboard" className="h-100 overflow-hidden">
            <div className="dashboard-body h-100 p-4">
                <div className="card border-0 rounded-0 shadow-sm">
                <div className="card-header bg-primary text-white p-4 text-center border-bottom-0">
                        <h3 className="font-weight-bold mb-1">
                            Klinik Pratama Patalan
                        </h3>
                        <p className="x-small mb-0">
                            Jl. Parangtritis KM 15 Gaduh, Patalan, Jetis, Bantul
                        </p>
                    </div>
                    <div className="card-body border border-top-0 p-4">
                     <h6 className="font-weight-bold">
                            No. Telp :
                        </h6>
                        <p className="small text-justify mb-3">
                            (0274) 368153
                        </p>
                        <h6 className="font-weight-bold">
                            Alamat Lengkap :
                        </h6>
                        <p className="small text-justify mb-3">
                            Jl. Parangtritis KM 15 Gaduh, Patalan, Jetis, Bantul, Yogyakarta
                        </p>
                        <h6 className="font-weight-bold">
                            Visi dan Misi :
                        </h6>
                        <p className="small text-justify mb-0">
                            Meningkatkan kesadaran dan kemampuan hidup sehat bagi masyarakat sekitar, sehingga mampu dapat terwujud derajat kesehatan yang semakin merata dan bermutu, sehingga mampu mewujudkan masyarakat yang sehat, cerdas, tangguh, mandiri dan produktif. Sesuai dengan tujuan didirikannya KLINIK dan RAWAT INAP “PATALAN” untuk dapat meningkatkan pengetahuan dan kesadaran masyarakat di bidang kesehatan maka diperlukan penunjang, yaitu dengan mengadakan penyuluhan, bakti social, pembuatan dan penyebaran leafleat kesehatan dan kegiatan lain yang sesuai dengan kebutuhan masyarakat dengan koordinasi dengan instansi kesehatan lainnya.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;