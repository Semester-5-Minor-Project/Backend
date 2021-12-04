const Incentive = require("../models/Incentive");
const Student = require("../models/Student");
const School = require("../models/School");
const csv = require("csvtojson");

exports.addIncentive = async (req, res) => {
    const { incentive, student_id, status, date, month, year } = req.body;

    var period;
    if (incentive === `mid-day-meal`) {
        period = req.body["date"];
    } else {
        period = req.body["month"];
    }

    try {
        const student = await Student.find({ student_id }, ["_id"]);
        var incentive_updated = null;
        switch (incentive) {
            case `mid-day-meal`:
                incentive_updated = await Incentive.updateOne({ student_id: student }, {
                    $push: {
                        mid_day_meal: {
                            date: period,
                            status
                        }
                    }
                }, { upsert : true })
                break;
            case `health-checkup`:
                incentive_updated = await Incentive.updateOne({ student_id: student }, {
                    $push: {
                        health_checkup: {
                            month,
                            year,
                            status
                        }
                    }
                }, { upsert : true })
                break;
            case `scholarship`:
                incentive_updated = await Incentive.updateOne({ student_id: student }, {
                    $push: {
                        scholarship: {
                            month,
                            year,
                            status
                        }
                    }
                }, { upsert : true })
                break;
        }
        if (incentive_updated) {
            res.status(200).send(incentive_updated);
        } else {
            res.status(200).send(
                {
                    message: "Unable to add."
                }
            )
        }
    } catch (err) {
        console.log(err);
    }
}

exports.addBatchIncentives = async (req, res) => {
    const { incentive, date, month, year } = req.body;

    if (req.files.student_file.mimetype === "text/csv") {
        let json_data = await csv().fromFile(req.files.student_file.tempFilePath);
        console.log(json_data);
        try {
            json_data.forEach(async (j) => {
                let student_id_curr = j["student_id"]
                const student = await Student.find({ student_id: student_id_curr }, ["_id"]);
                console.log(student);

                var incentive_updated;
                switch (incentive) {
                    case `mid-day-meal`:
                        incentive_updated = await Incentive.updateOne({ student_id: student }, {
                            $push: {
                                mid_day_meal: {
                                    date: date,
                                    status: j["status"]
                                }
                            }
                        }, { upsert : true })
                        break;
                    case `health-checkup`:
                        incentive_updated = await Incentive.updateOne({ student_id: student }, {
                            $push: {
                                health_checkup: {
                                    month,
                                    year,
                                    status: j["status"]
                                }
                            }
                        }, { upsert : true })
                        break;
                    case `scholarship`:
                        incentive_updated = await Incentive.updateOne({ student_id: student }, {
                            $push: {
                                scholarship: {
                                    month,
                                    year,
                                    status: j["status"]
                                }
                            }
                        }, { upsert : true })
                        break;
                }
            })
            res.status(200).send(
                {
                    message: "Inserted successfully."
                }
            )
        } catch(err) {
            res.status(500).send(err);
        }
    }
}

exports.getIncentiveInfoSchool = async (req, res) => {
    const { school_id, date, month, year, incentive } = req.query;
    
    try {
        const school = await School.find(
            {
                school_id
            },
        );
        const students = await Student.find(
            {
                currentSchool: school[0]["_id"],
            }, 
            ["_id"]
        );
        let student_list;
        
        switch(incentive) {
            case `mid-day-meal`:
                student_list = await Incentive.find({ student_id: { $in: students }, "mid_day_meal.date": date }, ["mid_day_meal.$"]);
                break;
            case `health-checkup`:
                student_list = await Incentive.find({ student_id: { $in: students }, "health_checkup.year": year, "health_checkup.month": month }, ["health_checkup.$"]);
                break;
            case `scholarhip`:
                student_list = await Incentive.find({ student_id: { $in: students }, "scholarship.year": year, "scholarship.month": month }, ["health_checkup.$"]);
  
        }
        if(student_list) {
            res.status(200).send(student_list);
        }
    } catch(err) {
        console.log(err);
    }
}