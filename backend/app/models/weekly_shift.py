from datetime import datetime, timezone

from ..extensions import db


def utc_now():
    return datetime.now(timezone.utc)


class WeeklyShift(db.Model):
    __tablename__ = "weekly_shifts"

    __table_args__ = (
        db.CheckConstraint(
            "day_of_week >= 0 AND day_of_week <= 6",
            name="ck_weekly_shifts_day_of_week",
        ),
        db.CheckConstraint(
            "end_time > start_time",
            name="ck_weekly_shifts_valid_time",
        ),
        db.Index(
            "ix_weekly_shifts_waiter_day",
            "waiter_id",
            "day_of_week",
        ),
    )

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    waiter_id = db.Column(
        db.Integer,
        db.ForeignKey("waiter_profiles.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    # Monday = 0, Tuesday = 1, ..., Sunday = 6
    day_of_week = db.Column(
        db.Integer,
        nullable=False,
    )

    start_time = db.Column(
        db.Time,
        nullable=False,
    )

    end_time = db.Column(
        db.Time,
        nullable=False,
    )

    is_active = db.Column(
        db.Boolean,
        nullable=False,
        default=True,
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    waiter = db.relationship(
        "WaiterProfile",
        backref=db.backref(
            "weekly_shifts",
            lazy=True,
            cascade="all, delete-orphan",
        ),
    )
